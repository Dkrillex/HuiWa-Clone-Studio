import React, { useState, useEffect } from 'react';
import { Tool, GenerationStatus, GeneratedImage } from '../types';
import { TAG_GROUPS, SAMPLE_IMAGES } from '../constants';
import { UploadZone } from './UploadZone';
import { ResultsGallery } from './ResultsGallery';
import { generateImageVariation, generateCreativeImage } from '../services/geminiService';
import { Sparkles, RefreshCw, HelpCircle, BookOpen, Coins } from 'lucide-react';

interface ToolPanelProps {
  tool: Tool;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({ tool }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.Idle);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Reset state when tool changes
  useEffect(() => {
    setSelectedImage(null);
    setPrompt('');
    setStatus(GenerationStatus.Idle);
    setGeneratedImage(null);
    setErrorMsg('');
  }, [tool.id]);

  const handleSampleClick = async (url: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(blob);
    } catch (e) {
        console.error("Failed to load sample", e);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage && tool.id !== 'creative') {
        alert("Please upload an image first.");
        return;
    }
    if (!prompt && tool.id === 'creative') {
        alert("Please enter a prompt.");
        return;
    }

    setStatus(GenerationStatus.Generating);
    setErrorMsg('');

    try {
        let resultUrl = '';
        
        if (tool.id === 'creative') {
            resultUrl = await generateCreativeImage(prompt);
        } else {
            // Default behavior for variations/fission/etc.
            resultUrl = await generateImageVariation(selectedImage!, prompt || "Create a high quality variation of this image.");
        }

        setGeneratedImage({
            id: Date.now().toString(),
            url: resultUrl,
            prompt: prompt,
            timestamp: Date.now()
        });
        setStatus(GenerationStatus.Success);
    } catch (error: any) {
        console.error(error);
        setStatus(GenerationStatus.Error);
        setErrorMsg(error.message || "Unknown error occurred");
    }
  };

  const handleTagClick = (tag: string) => {
      if (prompt.includes(tag)) return;
      setPrompt(prev => prev ? `${prev}, ${tag}` : tag);
  }

  return (
    <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-hidden flex bg-white">
      {/* Left Configuration Panel */}
      <div className="w-[400px] border-r border-gray-100 flex flex-col h-full overflow-y-auto scrollbar-thin">
        <div className="p-6 space-y-8">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg text-gray-800">{tool.name}</h1>
                <button className="flex items-center gap-1 text-gray-500 text-xs hover:text-gray-800">
                    <BookOpen size={14} /> 教程
                </button>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-500 -mt-4">{tool.description}</p>

            {/* Upload Area */}
            {tool.id !== 'creative' && (
                <div className="space-y-3">
                    <UploadZone selectedImage={selectedImage} onImageSelect={setSelectedImage} />
                    
                    {/* Sample Images */}
                    <div className="space-y-2">
                        <span className="text-xs text-gray-400">试一试</span>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {SAMPLE_IMAGES.map((src, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleSampleClick(src)}
                                    className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 hover:border-red-400 transition-colors"
                                >
                                    <img src={src} className="w-full h-full object-cover" alt="sample" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Prompt Input */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        {tool.id === 'fission' ? '描述裂变动作' : '画面描述'} 
                        <HelpCircle size={14} className="inline ml-1 text-gray-300" />
                        <span className="text-xs font-normal text-gray-400 ml-1">(非必填)</span>
                    </span>
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800">
                        <Sparkles size={12} /> 我的收藏
                    </button>
                </div>

                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={tool.id === 'creative' ? "Describe the image you want to create..." : "描述想要生成的动作，可参考形式：主体+运动\n示例：“一个模特转一圈”"}
                        className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
                        maxLength={500}
                    />
                    <div className="absolute bottom-3 left-3">
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                            <Sparkles size={12} className="text-red-500"/> 帮我写
                        </button>
                    </div>
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {prompt.length}/500
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
                 {TAG_GROUPS.map((group, idx) => (
                     <div key={idx} className="space-y-2">
                         <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-400">{group.label}</span>
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {group.tags.map(tag => (
                                 <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                 >
                                     {tag}
                                 </button>
                             ))}
                         </div>
                     </div>
                 ))}
                 <div className="flex justify-end">
                     <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600">
                         <RefreshCw size={12} /> 换一换
                     </button>
                 </div>
            </div>

            {/* Action Bar - Sticky at bottom of panel */}
            <div className="pt-4 pb-10 sticky bottom-0 bg-white/90 backdrop-blur border-t border-gray-50">
                <div className="mb-3 text-xs text-gray-400 leading-relaxed">
                    绘蛙持续调优中<br/>请谨慎鉴别生成结果
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={status === GenerationStatus.Generating || (tool.id !== 'creative' && !selectedImage)}
                    className={`w-full py-3.5 rounded-lg font-bold text-white shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-all ${
                        status === GenerationStatus.Generating 
                        ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                        : 'bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                    {status === GenerationStatus.Generating ? '生成中...' : '立即生成'}
                    <div className="flex items-center gap-0.5 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                        <Coins size={10} />
                        <span>2</span>
                    </div>
                </button>
                {errorMsg && (
                    <p className="text-red-500 text-xs mt-2 text-center">{errorMsg}</p>
                )}
            </div>
        </div>
      </div>

      {/* Right Preview Panel */}
      <div className="flex-1 bg-[#f8f9fb] relative overflow-hidden">
          <ResultsGallery 
            originalImage={selectedImage} 
            generatedImage={generatedImage} 
            status={status} 
            toolName={tool.name}
          />
      </div>
    </main>
  );
};