
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, Download, Key, Palette, Sliders, AlertCircle, Copy, Layers, WifiOff, ShieldAlert, PenLine, Crop, Tag, Maximize, MapPin, Upload, Zap, Sun, BoxSelect, Wand2, Info } from 'lucide-react';
import { generateDesignImages, enhanceImagePrompt } from '../services/geminiService';

interface ImageGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const STYLES = [
  "No Style",
  "Photorealistic",
  "Sketch",
  "Line Art",
  "3D Render",
  "Flat Illustration",
  "Vintage",
  "Cyberpunk",
  "Minimalist",
  "Oil Painting",
  "Watercolor"
];

const MOODS = [
  "No Mood",
  "Professional",
  "Clinical",
  "Clean",
  "Trustworthy",
  "Energetic",
  "Calm",
  "Futuristic",
  "Warm",
  "Dark",
  "Luxury",
  "Playful"
];

const LIGHTING_OPTIONS = [
  "No Lighting",
  "Studio Lighting",
  "Natural Sunlight",
  "Softbox",
  "Neon",
  "Cinematic",
  "Golden Hour"
];

const MATERIAL_OPTIONS = [
  "No Material",
  "Cotton",
  "Silk",
  "Polyester",
  "High-Tech Performance",
  "Denim",
  "Leather",
  "Linen"
];

const CATEGORIES = [
  "No Category",
  "Scrubs",
  "Uniforms",
  "Lab Coats",
  "Equipment",
  "Nurse Shoes & Crocs",
  "Accessories"
];

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "3:4" | "4:3" | "9:16" | "16:9">("1:1");
  const [count, setCount] = useState<number>(1);
  const [style, setStyle] = useState(STYLES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [lighting, setLighting] = useState(LIGHTING_OPTIONS[0]);
  const [material, setMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<{title: string, message: string, type: 'auth' | 'safety' | 'quota' | 'server' | 'unknown'} | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // State for Fullscreen Preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkApiKey();
    }
  }, [isOpen]);

  const checkApiKey = async () => {
    if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
    } else {
        // Fallback or assume environment variable is handled elsewhere if not in AI Studio iframe
        setHasApiKey(true); 
    }
  };

  const handleSelectKey = async () => {
    if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      await checkApiKey();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
          setError({
              title: "File too large",
              message: "Please select an image under 5MB.",
              type: 'unknown'
          });
          return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
        const enhanced = await enhanceImagePrompt(prompt);
        setPrompt(enhanced);
    } catch (e) {
        console.error("Enhance failed", e);
    } finally {
        setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    // Construct the refined prompt
    let fullPrompt = prompt;
    if (category !== "No Category") fullPrompt = `Category: ${category}. ${fullPrompt}`;
    if (style !== "No Style") fullPrompt += `. Style: ${style}`;
    if (mood !== "No Mood") fullPrompt += `. Mood: ${mood}`;
    if (lighting !== "No Lighting") fullPrompt += `. Lighting: ${lighting}`;
    if (material !== "No Material") fullPrompt += `. Material: ${material}`;
    fullPrompt += ". High quality, detailed.";

    try {
      const images = await generateDesignImages(fullPrompt, size, count, aspectRatio, uploadedImage || undefined);
      if (images && images.length > 0) {
        setGeneratedImages(images);
      } else {
        setError({
            title: "Generation Failed",
            message: "The AI could not generate an image for this prompt. It may have been filtered due to safety policies.",
            type: 'safety'
        });
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      const msg = (err.message || err.toString()).toLowerCase();
      
      let errorData = {
          title: "Generation Failed",
          message: "An unexpected error occurred. Please try again.",
          type: 'unknown' as 'auth' | 'safety' | 'quota' | 'server' | 'unknown'
      };

      if (msg.includes("api key") || msg.includes("403") || msg.includes("permission denied") || msg.includes("billing")) {
           setHasApiKey(false); // Reset key state to prompt selection again
           errorData = {
               title: "API Key or Billing Issue",
               message: "The API key provided is invalid, expired, or does not have billing enabled. Please select a valid paid key.",
               type: 'auth'
           };
      } else if (msg.includes("safety") || msg.includes("blocked") || msg.includes("harmful") || msg.includes("finishreason")) {
           errorData = {
               title: "Content Moderation Violation",
               message: "The prompt triggered safety filters. Please refine your description to avoid sensitive content.",
               type: 'safety'
           };
      } else if (msg.includes("429") || msg.includes("quota") || msg.includes("resource exhausted")) {
           errorData = {
               title: "Quota Exceeded",
               message: "You have exceeded the rate limits for this API key. Please check your Google Cloud quota usage.",
               type: 'quota'
           };
      } else if (msg.includes("500") || msg.includes("503") || msg.includes("internal") || msg.includes("unavailable") || msg.includes("overloaded")) {
           errorData = {
               title: "Service Unavailable",
               message: "The AI service is temporarily overloaded. Please try again in a few moments.",
               type: 'server'
           };
      } else if (msg.includes("location") || msg.includes("region")) {
            errorData = {
                title: "Region Not Supported",
                message: "This AI model may not be available in your current location.",
                type: 'server'
            };
      } else if (msg.includes("fetch failed") || msg.includes("network")) {
           errorData = {
               title: "Network Error",
               message: "Could not connect to the AI service. Please check your internet connection.",
               type: 'server'
           };
      } else {
           errorData = {
               title: "Unexpected Error",
               message: `Error: ${err.message || "Unknown"}. Please try again later.`,
               type: 'unknown'
           };
      }
      
      setError(errorData);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-90 transition-opacity" onClick={onClose}></div>

        <div className="inline-block bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-300" />
              AI Design Studio
            </h3>
            <button onClick={onClose} className="text-teal-100 hover:text-white focus:outline-none">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-6 text-gray-900 dark:text-white">
            {!hasApiKey ? (
              <div className="text-center py-8">
                <Key className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">API Key Required</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  To use high-quality image generation, you need to select a paid API key from your Google Cloud project.
                </p>
                <button
                  onClick={handleSelectKey}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Select API Key
                </button>
                <div className="mt-4 text-xs text-gray-400">
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-600">
                        View billing documentation
                    </a>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Describe a new scrub pattern, logo idea, or uniform concept.
                </p>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1 relative">
                        <div className="flex items-center">
                            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Prompt</label>
                            <div className="relative group">
                                <Info className="h-4 w-4 text-gray-400 hover:text-teal-500 cursor-help transition-colors" />
                                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 dark:bg-slate-950 border border-gray-700 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 animate-in fade-in zoom-in-95">
                                    <h5 className="font-bold mb-1 text-teal-400">Pro Tips:</h5>
                                    <ul className="list-disc pl-3 space-y-1 text-gray-300">
                                        <li><strong>Subject:</strong> "Blue scrubs", "Golden stethoscope"</li>
                                        <li><strong>Context:</strong> "Folded neatly", "On a marble desk"</li>
                                        <li><strong>Style:</strong> Use "Minimalist", "Cinematic"</li>
                                    </ul>
                                    <div className="absolute bottom-[-5px] left-1 w-3 h-3 bg-gray-900 dark:bg-slate-950 border-b border-r border-gray-700 transform rotate-45"></div>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handleEnhancePrompt}
                            disabled={!prompt.trim() || isEnhancing}
                            className="text-xs flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-purple-200 dark:border-purple-800"
                            title="Suggest improvements for detail and clarity"
                        >
                            {isEnhancing ? (
                                <Zap className="h-3 w-3 mr-1.5 animate-pulse" />
                            ) : (
                                <Wand2 className="h-3 w-3 mr-1.5" />
                            )}
                            {isEnhancing ? "Enhancing..." : "Magic Enhance"}
                        </button>
                    </div>
                    <div className="relative mt-1">
                        <textarea
                          id="prompt"
                          rows={3}
                          className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-all dark:bg-slate-700 dark:text-white ${
                              !prompt.trim() ? 'border-gray-300 dark:border-slate-600' : 'border-teal-500 ring-1 ring-teal-500 bg-teal-50/10 dark:bg-teal-900/20'
                          }`}
                          placeholder="E.g., A futuristic nurse uniform with neon blue piping"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                        {!prompt.trim() && (
                            <div className="absolute top-3 right-3 text-teal-500 opacity-50 pointer-events-none animate-pulse">
                                <PenLine className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reference Image (Optional)</label>
                    {!uploadedImage ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md cursor-pointer hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
                             onClick={() => document.getElementById('file-upload')?.click()}>
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                    <span className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 focus-within:outline-none">
                                        Upload a file
                                    </span>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG up to 5MB</p>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2 relative group w-fit">
                            <img src={uploadedImage} alt="Reference" className="h-32 w-auto object-contain rounded-md border border-gray-200 dark:border-slate-600" />
                            <button 
                                onClick={() => setUploadedImage(null)} 
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                title="Remove Image"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                  </div>

                  {/* Refinement Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 dark:bg-slate-700 p-3 rounded-lg border border-gray-100 dark:border-slate-600">
                     <div className="sm:col-span-2 lg:col-span-1">
                      <label htmlFor="category" className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <Tag className="h-3 w-3 mr-1" /> Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="style" className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <Palette className="h-3 w-3 mr-1" /> Style
                      </label>
                      <select
                        id="style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                         className="block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                      >
                        {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mood" className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <Sliders className="h-3 w-3 mr-1" /> Mood
                      </label>
                      <select
                        id="mood"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                      >
                        {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="lighting" className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <Sun className="h-3 w-3 mr-1" /> Lighting
                      </label>
                      <select
                        id="lighting"
                        value={lighting}
                        onChange={(e) => setLighting(e.target.value)}
                        className="block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                      >
                        {LIGHTING_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="material" className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <BoxSelect className="h-3 w-3 mr-1" /> Material
                      </label>
                      <select
                        id="material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                      >
                        {MATERIAL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Format Settings (Size & Aspect Ratio) */}
                  <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg border border-gray-100 dark:border-slate-600">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Format Settings</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                <Maximize className="h-3 w-3 mr-1" /> Image Size
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                {(['1K', '2K', '4K'] as const).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`flex-1 text-xs py-1.5 px-2 first:rounded-l-md last:rounded-r-md border border-gray-300 dark:border-slate-500 ${
                                            size === s 
                                            ? 'bg-teal-600 text-white border-teal-600 z-10' 
                                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div className="sm:col-span-1">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                <Crop className="h-3 w-3 mr-1" /> Aspect Ratio
                            </label>
                            <div className="flex flex-wrap gap-1">
                                {(["1:1", "16:9", "9:16", "4:3", "3:4"] as const).map((ratio) => (
                                    <button
                                        key={ratio}
                                        onClick={() => setAspectRatio(ratio)}
                                        className={`flex-1 min-w-[3rem] text-xs py-1.5 px-1 rounded-md border border-gray-300 dark:border-slate-500 transition-colors ${
                                            aspectRatio === ratio
                                            ? 'bg-teal-600 text-white border-teal-600'
                                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                                        }`}
                                        title={ratio === "1:1" ? "Square" : ratio === "16:9" ? "Landscape" : ratio === "9:16" ? "Portrait" : ""}
                                    >
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Layers className="h-3 w-3 mr-1" /> Variations
                                </div>
                                <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                    {count}
                                </span>
                            </label>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-[10px] text-gray-400 font-medium">1</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="4"
                                    step="1"
                                    value={count}
                                    onChange={(e) => setCount(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 dark:focus:ring-offset-slate-800"
                                />
                                <span className="text-[10px] text-gray-400 font-medium">4</span>
                            </div>
                        </div>
                    </div>
                  </div>

                  {error && (
                    <div className={`rounded-md p-4 animate-in fade-in slide-in-from-top-2 ${
                        error.type === 'auth' ? 'bg-amber-50 border border-amber-200' :
                        error.type === 'safety' ? 'bg-red-50 border border-red-200' :
                        error.type === 'quota' ? 'bg-orange-50 border border-orange-200' :
                        'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {error.type === 'auth' && <Key className="h-5 w-5 text-amber-400" aria-hidden="true" />}
                          {error.type === 'safety' && <ShieldAlert className="h-5 w-5 text-red-400" aria-hidden="true" />}
                          {error.type === 'quota' && <AlertCircle className="h-5 w-5 text-orange-400" aria-hidden="true" />}
                          {error.type === 'server' && (<MapPin className="h-5 w-5 text-red-400" aria-hidden="true" />)}
                          {error.type === 'unknown' && <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />}
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${
                              error.type === 'auth' ? 'text-amber-800' :
                              error.type === 'safety' ? 'text-red-800' :
                              error.type === 'quota' ? 'text-orange-800' :
                              'text-red-800'
                          }`}>
                              {error.title}
                          </h3>
                          <div className={`mt-2 text-sm ${
                              error.type === 'auth' ? 'text-amber-700' :
                              error.type === 'safety' ? 'text-red-700' :
                              error.type === 'quota' ? 'text-orange-700' :
                              'text-red-700'
                          }`}>
                            <p>{error.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Designs...
                      </>
                    ) : (
                      'Generate Designs'
                    )}
                  </button>
                </div>
              </>
            )}

            {generatedImages.length > 0 && (
              <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Generated Results</h4>
                <div className={`grid gap-4 ${generatedImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {generatedImages.map((imgSrc, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm animate-in fade-in zoom-in duration-700 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                            <img
                            src={imgSrc}
                            alt={`Generated design ${idx + 1}`}
                            className="w-full h-auto object-contain bg-gray-50 dark:bg-slate-900 opacity-0 transition-opacity duration-700"
                            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                            />
                            {generatedImages.length > 1 && (
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-teal-900/80 backdrop-blur-sm text-teal-100 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm border border-teal-700/50 z-10">
                                    Var {idx + 1}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
                                <button
                                    onClick={() => setPreviewImage(imgSrc)}
                                    className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-2.5 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                                    title="Preview Fullscreen"
                                >
                                    <Maximize className="h-4 w-4" />
                                </button>
                                <a
                                    href={imgSrc}
                                    download={`dr-nurse-design-${idx + 1}.png`}
                                    className="bg-teal-600 text-white p-2.5 rounded-full shadow-lg hover:bg-teal-700 transition"
                                    title="Download Image"
                                >
                                    <Download className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
    {/* Fullscreen Preview Modal */}
    {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 p-4" onClick={() => setPreviewImage(null)}>
            <button className="absolute top-4 right-4 text-white hover:text-gray-300">
                <X className="h-8 w-8" />
            </button>
            <img 
                src={previewImage} 
                alt="Full preview" 
                className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                 <a
                    href={previewImage}
                    download="dr-nurse-design-hq.png"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition flex items-center"
                 >
                    <Download className="h-4 w-4 mr-2" /> Download Original
                 </a>
            </div>
        </div>
    )}
    </>
  );
};

export default ImageGenerator;
