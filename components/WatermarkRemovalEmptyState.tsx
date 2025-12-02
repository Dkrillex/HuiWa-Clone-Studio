import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WATERMARK_CASES } from '../constants';

export const WatermarkRemovalEmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center overflow-y-auto scrollbar-thin">
        <div className="flex flex-col items-center justify-center p-10 text-center w-full max-w-5xl">
            <h2 className="text-xl text-gray-700 font-medium mb-10">无需手动涂抹，一键去除水印和文字</h2>
            
            <div className="flex items-center gap-4 md:gap-12 w-full justify-center mb-10">
                {/* Before */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-64 aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="With Watermark" />
                        {/* Simulated Watermark Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-white/60 text-3xl font-bold rotate-[-30deg] select-none border-4 border-white/40 p-4 rounded-xl">
                                WATERMARK
                            </div>
                            <div className="absolute top-1/4 left-1/4 text-white/40 text-sm font-bold rotate-[-15deg]">© COPYRIGHT</div>
                            <div className="absolute bottom-1/4 right-1/4 text-white/40 text-sm font-bold rotate-[-15deg]">SAMPLE</div>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">上传原图</span>
                </div>

                <ArrowRight className="text-orange-500 w-8 h-8 flex-shrink-0" />

                {/* After */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-64 aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Clean Result" />
                    </div>
                    <span className="text-sm text-gray-500">自动去水印/文字</span>
                </div>
            </div>

            <div className="mb-12">
                <button className="bg-gray-800 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
                    一键做同款
                </button>
            </div>

            {/* Excellent Cases */}
            <div className="w-full">
                <h3 className="text-lg text-gray-700 font-medium mb-6">优秀案例</h3>
                <div className="grid grid-cols-4 gap-4">
                    {WATERMARK_CASES.map(item => (
                        <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                            <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={item.label} />
                            <div className="absolute bottom-2 left-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                                原图
                            </div>
                            <div className="absolute bottom-2 right-2 bg-white/90 text-gray-800 text-[10px] px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                做同款
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};