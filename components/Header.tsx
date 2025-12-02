import React from 'react';
import { Crown, Zap, HelpCircle, User, Coins } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <span className="font-bold text-gray-800 text-lg">Lunart</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="text-gray-900 hover:text-red-500">首页</a>
          <a href="#" className="text-red-500">AI生图</a>
          <a href="#" className="hover:text-red-500">AI修图</a>
          <a href="#" className="hover:text-red-500">AI视频</a>
          <a href="#" className="hover:text-red-500">模特广场</a>
          <a href="#" className="hover:text-red-500">作品与素材</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 bg-gray-900 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors">
          <Crown size={14} />
          9.9元开通会员
        </button>
        
        <button className="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-100 transition-colors">
          <Zap size={14} />
          免费得算力点
        </button>

        <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full text-xs font-bold">
          <Coins size={14} />
          <span>50</span>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <HelpCircle size={20} />
        </button>

        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};