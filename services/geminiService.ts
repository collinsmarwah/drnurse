
import { GoogleGenAI } from "@google/genai";
import { STORE_NAME, PRODUCTS } from '../constants';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

// Helper to safely get API key
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return null;
};

// Helper to fetch products for the context
const fetchProductsForContext = async (): Promise<string> => {
    try {
        const { data } = await supabase.from('products').select('*');
        // Use database items if available, otherwise fallback to local constant data
        const products = (data && data.length > 0) ? (data as Product[]) : PRODUCTS;
        
        return products.map(p => 
            `- ${p.name} (KES ${p.price.toLocaleString()}): ${p.description} [Stock: ${p.stock > 0 ? p.stock : 'Out of Stock'}]`
        ).join('\n');
    } catch (e) {
        // Fallback to constants on error
        return PRODUCTS.map(p => 
            `- ${p.name} (KES ${p.price.toLocaleString()}): ${p.description} [Stock: ${p.stock > 0 ? p.stock : 'Out of Stock'}]`
        ).join('\n');
    }
};

const buildSystemInstruction = (inventoryList: string) => `
You are the Virtual Assistant for ${STORE_NAME}. 
We specialize in premium medical attire and equipment for doctors and nurses.

Your goal is to help customers find products, suggest matching items (e.g., matching a stethoscope color to scrubs), and answer questions about sizing or customization.
Be professional, helpful, and concise.

Here is a list of our specific products available right now:
${inventoryList}

If a user asks about a product we don't have, politely inform them we don't carry it but suggest a similar alternative from our list if possible.
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API Key missing for Gemini Chat");
        return "I'm having trouble connecting to my brain right now. Please ensure the API Key is configured.";
    }

    // Fetch fresh inventory for every new session or message to ensure accuracy
    const inventoryList = await fetchProductsForContext();
    const systemInstruction = buildSystemInstruction(inventoryList);

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't catch that. Could you say it again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble checking our inventory right now. Please try again in a moment.";
  }
};

export const enhanceImagePrompt = async (originalPrompt: string): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) return originalPrompt;
        
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Rewrite the following image description into a detailed, high-quality prompt for an AI image generator. Focus on clarity, fine details, lighting, fabric texture, realism, and medical aesthetics. Keep it concise (under 50 words) but highly descriptive. Input: "${originalPrompt}"`,
        });
        
        return response.text || originalPrompt;
    } catch (error) {
        console.warn("Prompt enhancement failed", error);
        return originalPrompt;
    }
};

export const generateDesignImages = async (
  prompt: string, 
  size: '1K' | '2K' | '4K', 
  count: number = 1,
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1",
  baseImage?: string
): Promise<string[]> => {
  try {
    const apiKey = getApiKey();
    // We create a helper to run a single generation
    const generateOne = async (): Promise<string | null> => {
      try {
        if (!apiKey) {
           console.warn("API Key missing for image generation");
           return null;
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        const parts: any[] = [{ text: prompt }];
        
        // Add image part if baseImage is provided
        if (baseImage) {
            const matches = baseImage.match(/^data:(.+);base64,(.+)$/);
            if (matches) {
                parts.push({
                    inlineData: {
                        mimeType: matches[1],
                        data: matches[2]
                    }
                });
            }
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: parts,
          },
          config: {
            imageConfig: {
              imageSize: size,
              aspectRatio: aspectRatio
            },
            // CRITICAL: Add random seed to ensure variations are different
            seed: Math.floor(Math.random() * 2147483647)
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        return null;
      } catch (e) {
        console.warn("Single image generation failed", e);
        return null;
      }
    };

    // Run 'count' requests in parallel
    const promises = Array.from({ length: count }, () => generateOne());
    const results = await Promise.all(promises);
    
    // Filter out any failures
    return results.filter((img): img is string => img !== null);

  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

export const generatePlaceholderImage = async (productName: string): Promise<string | null> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return null;

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Professional product photography of ${productName}, medical attire or equipment store, white background, high quality, photorealistic.` }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    // Fail silently for placeholders
    return null;
  }
};
