import React, { useState, useEffect } from 'react';
import { Tool, GenerationStatus, GeneratedImage } from '../types';
import { TAG_GROUPS, SAMPLE_IMAGES, BG_PRESETS, PRODUCT_CATEGORIES, BG_SWAP_SAMPLES, WATERMARK_SAMPLES } from '../constants';
import { UploadZone } from './UploadZone';
import { ResultsGallery } from './ResultsGallery';
import { generateImageVariation, generateCreativeImage, generateProductScene, removeWatermark } from '../services/geminiService';
import { Sparkles, RefreshCw, HelpCircle, BookOpen, Coins, ChevronDown, Check } from 'lucide-react';

interface ToolPanelProps {
  tool: Tool;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({ tool }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.Idle);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Bg Swap Specific States
  const [bgPresetId, setBgPresetId] = useState<string>('wood-hanger');
  const [productCategoryId, setProductCategoryId] = useState<string>('');
  
  const isBgSwap = tool.id === 'bg-swap-product';
  const isWatermark = tool.id === 'remove-watermark';

  // Reset state when tool changes
  useEffect(() => {
    setSelectedImage(null);
    setPrompt('');
    setStatus(GenerationStatus.Idle);
    setGeneratedImage(null);
    setErrorMsg('');
    setBgPresetId('wood-hanger');
    setProductCategoryId('');
  }, [tool.id]);

  // Update prompt when preset changes for Bg Swap
  useEffect(() => {
      if (isBgSwap && bgPresetId !== 'custom') {
          const preset = BG_PRESETS.find(p => p.id === bgPresetId);
          if (preset) {
              setPrompt(preset.prompt);
          }
      }
  }, [bgPresetId, isBgSwap]);

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
    if (isBgSwap && !prompt && bgPresetId === 'custom') {
        alert("Please enter a custom prompt.");
        return;
    }

    setStatus(GenerationStatus.Generating);
    setErrorMsg('');

    try {
        let resultUrl = '';
        
        if (tool.id === 'creative') {
            resultUrl = await generateCreativeImage(prompt);
        } else if (isBgSwap) {
            const categoryLabel = PRODUCT_CATEGORIES.find(c => c.id === productCategoryId)?.label;
            resultUrl = await generateProductScene(selectedImage!, prompt, categoryLabel);
        } else if (isWatermark) {
            resultUrl = await removeWatermark(selectedImage!);
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

  const renderBgSwapControls = () => (
      <div className="space-y-6">
          {/* Product Category */}
          <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">商品类目</label>
              <div className="relative">
                  <select 
                    value={productCategoryId}
                    onChange={(e) => setProductCategoryId(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                      <option value="" disabled>请选择</option>
                      {PRODUCT_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
              </div>
          </div>

          {/* Background Selection */}
          <div className="space-y-4">
              <div className="flex border-b border-gray-100">
                  <button className="flex-1 pb-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                      文生背景
                  </button>
                  <button className="flex-1 pb-2 text-sm font-medium text-gray-400 hover:text-gray-600">
                      上传背景
                  </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                  {BG_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => setBgPresetId(preset.id)}
                        className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            bgPresetId === preset.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                          {preset.image ? (
                              <img src={preset.image} alt={preset.name} className="w-full h-full object-cover" />
                          ) : (
                              <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                                  {preset.icon}
                              </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 text-center">
                              <span className="text-[10px] text-white block truncate">{preset.name}</span>
                          </div>
                          {bgPresetId === preset.id && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                                  <Check size={10} />
                              </div>
                          )}
                      </button>
                  ))}
              </div>

              {/* Show textarea only if custom or just to show prompt */}
              {bgPresetId === 'custom' && (
                  <div className="space-y-2 animate-fadeIn">
                       <label className="text-xs text-gray-500">自定义背景描述</label>
                       <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="描述您想要的背景..."
                            className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                  </div>
              )}
          </div>
      </div>
  );

  const renderGenericControls = () => (
      <>
        {isWatermark ? (
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                    生成张数 <span className="text-gray-400 font-normal">(1-4张)</span>
                </label>
                <div className="relative">
                    <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm">
                        <option value="1">1</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>
        ) : (
            <>
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
            </>
        )}
      </>
  );

  const getSampleImages = () => {
    if (isBgSwap) return BG_SWAP_SAMPLES;
    if (isWatermark) return WATERMARK_SAMPLES;
    return SAMPLE_IMAGES;
  };

  const getUploadTitle = () => {
      if (isBgSwap) return "上传商品图";
      if (isWatermark) return "上传原图";
      return "上传模特图";
  }

  return (
    <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-hidden flex bg-white">
      {/* Left Configuration Panel */}
      <div className="w-[400px] border-r border-gray-100 flex flex-col h-full overflow-y-auto scrollbar-thin">
        <div className="p-6 space-y-8">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg text-gray-800">{isWatermark ? "一键去除水印和文字" : tool.name}</h1>
                <button className="flex items-center gap-1 text-gray-500 text-xs hover:text-gray-800">
                    <BookOpen size={14} /> 教程
                </button>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-500 -mt-4">{tool.description}</p>

            {/* Upload Area */}
            {tool.id !== 'creative' && (
                <div className="space-y-3">
                    <UploadZone 
                        selectedImage={selectedImage} 
                        onImageSelect={setSelectedImage} 
                        title={getUploadTitle()}
                    />
                    
                    {/* Sample Images */}
                    <div className="space-y-2">
                        <span className="text-xs text-gray-400">试一试</span>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {getSampleImages().map((src, idx) => (
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

            {isBgSwap ? renderBgSwapControls() : renderGenericControls()}

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
                        : isBgSwap ? 'bg-gray-800 hover:bg-black' 
                        : isWatermark ? 'bg-[#ff3b4e] hover:bg-[#e63546] shadow-red-200/50'
                        : 'bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                    {status === GenerationStatus.Generating ? '生成中...' : isBgSwap ? '一键做同款' : isWatermark ? '免费试用 剩余19次' : '立即生成'}
                    {!isWatermark && (
                        <div className="flex items-center gap-0.5 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                            <Coins size={10} />
                            <span>2</span>
                        </div>
                    )}
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
            toolId={tool.id}
          />
      </div>
    </main>
  );
};