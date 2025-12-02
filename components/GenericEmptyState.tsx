import React from 'react';

export const GenericEmptyState: React.FC = () => {
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
};