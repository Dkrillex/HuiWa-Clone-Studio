import React from 'react';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeToolId: string;
  onSelectTool: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onSelectTool }) => {
  const categories = [
    { id: ToolCategory.ProductOnBody, label: '商品上身', tools: TOOLS.filter(t => t.category === ToolCategory.ProductOnBody) },
    { id: ToolCategory.Variations, label: '单图变多图', tools: TOOLS.filter(t => t.category === ToolCategory.Variations) },
    { id: ToolCategory.Creation, label: '图片创作', tools: TOOLS.filter(t => t.category === ToolCategory.Creation) },
    { id: ToolCategory.Enterprise, label: '企业功能', tools: TOOLS.filter(t => t.category === ToolCategory.Enterprise) },
    { id: ToolCategory.Custom, label: '自定义功能', tools: TOOLS.filter(t => t.category === ToolCategory.Custom) },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0 pb-10">
      <div className="p-4 space-y-6">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-xs text-gray-400 mb-2 px-2">{cat.label}</h3>
            <div className="space-y-1">
              {cat.tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                    activeToolId === tool.id
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${activeToolId === tool.id ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {tool.icon}
                    </span>
                    <span>{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.isNew && <span className="text-[10px] bg-red-500 text-white px-1 rounded">new</span>}
                    {tool.isHot && <span className="text-[10px] bg-orange-100 text-orange-500 px-1 rounded">升级</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};