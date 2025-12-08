
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, Download, Key, Palette, Sliders, AlertCircle, Copy, Layers, WifiOff, ShieldAlert, PenLine, Crop, Tag, Maximize } from 'lucide-react';
import { generateDesignImages } from '../services/geminiService';

interface ImageGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const STYLES = [
  "No Style",
  "Photorealistic",
  "Sketch",
  "3D Render",
  "Flat Illustration",
  "Vintage",
  "Cyberpunk",
  "Minimalist",
  "Oil Painting"
];

const MOODS = [
  "No Mood",
  "Professional",
  "Energetic",
  "Calm",
  "Futuristic",
  "Warm",
  "Dark",
  "Luxury",
  "Playful"
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
  const [category, setCategory] = useState(CATEGORIES[0]);
  
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{title: string, message: string, type: 'auth' | 'safety' | 'quota' | 'server' | 'unknown'} | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

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
    fullPrompt += ". High quality, detailed.";

    try {
      const images = await generateDesignImages(fullPrompt, size, count, aspectRatio);
      if (images && images.length > 0) {
        setGeneratedImages(images);
      } else {
        setError({
            title: "Generation Failed",
            message: "The AI could not generate an image for this prompt. It may have been too vague or filtered.",
            type: 'unknown'
        });
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      const msg = (err.message || err.toString()).toLowerCase();
      
      if (msg.includes("not found") || msg.includes("api key") || msg.includes("403") || msg.includes("permission denied")) {
           setHasApiKey(false); // Reset key state to prompt selection again
           setError({
               title: "API Key Invalid",
               message: "The API key provided is invalid, expired, or missing permissions. Please select a valid key with billing enabled.",
               type: 'auth'
           });
      } else if (msg.includes("safety") || msg.includes("blocked") || msg.includes("harmful") || msg.includes("finishreason")) {
           setError({
               title: "Content Moderation Violation",
               message: "The prompt triggered safety filters. Please refine your description to avoid sensitive or prohibited content.",
               type: 'safety'
           });
      } else if (msg.includes("429") || msg.includes("quota") || msg.includes("resource exhausted")) {
           setError({
               title: "Quota Exceeded",
               message: "You have exceeded the rate limits or quota for this API key. Please check your Google Cloud plan.",
               type: 'quota'
           });
      } else if (msg.includes("500") || msg.includes("503") || msg.includes("internal") || msg.includes("unavailable") || msg.includes("overloaded")) {
           setError({
               title: "Service Unavailable",
               message: "The AI design service is temporarily unavailable. Please try again in a few moments.",
               type: 'server'
           });
      } else if (msg.includes("fetch failed") || msg.includes("network")) {
           setError({
               title: "Network Error",
               message: "Could not connect to the service. Please check your internet connection.",
               type: 'server'
           });
      } else {
           setError({
               title: "Unexpected Error",
               message: `An error occurred: ${err.message || "Unknown error"}. Please try again.`,
               type: 'unknown'
           });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-90 transition-opacity" onClick={onClose}></div>

        <div className="inline-block bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
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
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prompt</label>
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

                  {/* Refinement Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Tag className="h-3 w-3 mr-1" /> Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-8 py-2 text-base border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Palette className="h-3 w-3 mr-1" /> Style
                      </label>
                      <select
                        id="style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-8 py-2 text-base border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Sliders className="h-3 w-3 mr-1" /> Mood
                      </label>
                      <select
                        id="mood"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-8 py-2 text-base border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
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
                            <select
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value as any)}
                                className="block w-full text-xs py-1.5 px-2 border border-gray-300 dark:border-slate-500 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="1:1">1:1 (Square)</option>
                                <option value="16:9">16:9 (Landscape)</option>
                                <option value="9:16">9:16 (Portrait)</option>
                                <option value="4:3">4:3 (Classic)</option>
                                <option value="3:4">3:4 (Vertical)</option>
                            </select>
                        </div>

                         <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                <Layers className="h-3 w-3 mr-1" /> Variations
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                {[1, 2, 3, 4].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setCount(n)}
                                        className={`flex-1 text-xs py-1.5 px-2 first:rounded-l-md last:rounded-r-md border border-gray-300 dark:border-slate-500 ${
                                            count === n 
                                            ? 'bg-teal-600 text-white border-teal-600 z-10' 
                                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
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
                          {error.type === 'server' && <WifiOff className="h-5 w-5 text-red-400" aria-hidden="true" />}
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
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-teal-900/80 backdrop-blur-sm text-teal-100 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm border border-teal-700/50">
                                    Var {idx + 1}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <a
                                    href={imgSrc}
                                    download={`dr-nurse-design-${idx + 1}.png`}
                                    className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm flex items-center hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
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
  );
};

export default ImageGenerator;
