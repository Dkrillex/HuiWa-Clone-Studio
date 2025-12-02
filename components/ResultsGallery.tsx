import React from 'react';
import { GeneratedImage, GenerationStatus } from '../types';
import { Download, Share2, Heart, ArrowRight } from 'lucide-react';

interface ResultsGalleryProps {
  originalImage: string | null;
  generatedImage: GeneratedImage | null;
  status: GenerationStatus;
  toolName: string;
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ 
  originalImage, 
  generatedImage, 
  status,
  toolName
}) => {
  if (!originalImage && status === GenerationStatus.Idle) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center">
        <div className="w-64 h-48 bg-gray-50 rounded-xl mb-6 flex items-center justify-center border border-gray-100">
          <span className="text-sm">生成的图片将在这里显示</span>
        </div>
        <h2 className="text-lg text-gray-700 font-medium mb-2">只需一张模特图，得到多姿势套图</h2>
        <p className="text-sm text-gray-400 max-w-md">
          上传模特图片，输入想要生成的动作描述，AI自动生成高质量裂变图。
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
           <h3 className="font-medium text-gray-700">{status === GenerationStatus.Generating ? '正在生成中...' : '生成结果'}</h3>
           {generatedImage && (
             <div className="flex gap-2">
               <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Heart size={18}/></button>
               <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Share2 size={18}/></button>
               <button className="flex items-center gap-1 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800">
                 <Download size={14} /> 下载
               </button>
             </div>
           )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Original */}
          <div className="relative group w-full md:w-1/2 aspect-[3/4] max-w-sm rounded-xl overflow-hidden bg-gray-100">
            <img src={originalImage || ''} className="w-full h-full object-cover" alt="Original" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-sm font-medium">原图</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-orange-500 hidden md:block">
             {status === GenerationStatus.Generating ? (
                <div className="animate-pulse"><ArrowRight size={32} /></div>
             ) : (
                <ArrowRight size={32} />
             )}
          </div>

          {/* Result */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] max-w-sm rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent">
             {status === GenerationStatus.Generating ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                  <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 text-sm animate-pulse">AI正在思考动作...</p>
                  <p className="text-gray-400 text-xs mt-2">预计剩余 5-10 秒</p>
               </div>
             ) : status === GenerationStatus.Error ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 text-red-500 p-4 text-center">
                  <p className="font-medium mb-2">生成失败</p>
                  <p className="text-xs">请检查API KEY或稍后重试</p>
               </div>
             ) : generatedImage ? (
                <>
                  <img src={generatedImage.url} className="w-full h-full object-cover" alt="Generated" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium line-clamp-1">{generatedImage.prompt}</p>
                  </div>
                </>
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                 <span className="text-sm">等待生成</span>
               </div>
             )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
           <p className="text-xs text-gray-400">生成结果仅供参考，请谨慎甄别生成结果</p>
        </div>
      </div>
    </div>
  );
};