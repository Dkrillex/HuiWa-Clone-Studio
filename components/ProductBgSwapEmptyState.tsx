import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProductBgSwapEmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center overflow-y-auto">
        <h2 className="text-xl text-gray-700 font-medium mb-10">只需一张商品图（鞋包等），得到逼真场景图</h2>
        
        <div className="flex items-center gap-4 md:gap-8 max-w-4xl w-full">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
                        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80" className="max-h-full object-contain mix-blend-multiply" alt="Example Product" />
                </div>
                <span className="text-sm text-gray-500">上传商品图</span>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[1px]" alt="Background process" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">AI处理中</div>
                        </div>
                </div>
                <span className="text-sm text-gray-500">选择背景图</span>
            </div>

            <ArrowRight className="text-orange-500 w-8 h-8 flex-shrink-0" />

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Example Result" />
                </div>
                <span className="text-sm text-gray-500">生成场景图</span>
            </div>
        </div>

        <div className="mt-12">
            <button className="bg-gray-800 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
                一键做同款
            </button>
        </div>
    </div>
  );
};