import React from 'react';
import { 
  Shirt, 
  Layers, 
  Copy, 
  Image as ImageIcon, 
  Scissors, 
  Box, 
  Wand2, 
  MonitorPlay, 
  User, 
  Palette,
  ScanLine,
  ShoppingBag,
  Sparkles,
  UploadCloud,
  Maximize2,
  Camera,
  LayoutGrid
} from 'lucide-react';
import { Tool, ToolCategory, TagGroup } from './types';

export const TOOLS: Tool[] = [
  // Product On Body
  { id: 'try-on', name: '服装上身', icon: <Shirt size={18} />, category: ToolCategory.ProductOnBody, description: '服装图一键上身试穿' },
  { id: 'wear-all', name: '万物穿戴', icon: <ShoppingBag size={18} />, category: ToolCategory.ProductOnBody, description: '鞋包等多类型商品一键穿戴' },
  { id: 'mix-match', name: '搭配融图', icon: <Layers size={18} />, category: ToolCategory.ProductOnBody, isHot: true, description: '自由搭配组合，生成模特图' },
  
  // Variations
  { id: 'bg-swap-model', name: '换模特背景', icon: <User size={18} />, category: ToolCategory.Variations, description: '同一商品替换模特和背景' },
  { id: 'fission', name: '裂变套图', icon: <Copy size={18} />, category: ToolCategory.Variations, description: '单图裂变为多张相似图' },
  
  // Creation
  { id: 'creative', name: '创意生图', icon: <Wand2 size={18} />, category: ToolCategory.Creation, isHot: true, description: '随心创作想要的模特图' },
  
  // Enterprise
  { id: 'batch', name: '批量生图', icon: <LayoutGrid size={18} />, category: ToolCategory.Enterprise, description: '100个商品一键批量生图' },
  { id: 'ad-check', name: '投前检测', icon: <ScanLine size={18} />, category: ToolCategory.Enterprise, description: '检测图片，提升投放效率' },
  
  // Custom
  { id: 'flat-3d', name: '平铺转3D', icon: <Box size={18} />, category: ToolCategory.Custom, description: '平铺图生成服装3D图' },
  { id: 'bg-swap-product', name: '商品换背景', icon: <Palette size={18} />, category: ToolCategory.Custom, description: '商品图生成逼真场景图' },
  { id: 'remove-watermark', name: '智能去印', icon: <Scissors size={18} />, category: ToolCategory.Custom, description: '一键去除水印和文字' },
  { id: 'details', name: '服装细节图', icon: <Maximize2 size={18} />, category: ToolCategory.Custom, description: '服装图生成细节放大图' },
  { id: 'extract', name: '商品提取', icon: <UploadCloud size={18} />, category: ToolCategory.Custom, isHot: true, description: '从任意图中提取商品平铺图' },
  { id: 'lifestyle', name: '服装种草图', icon: <Camera size={18} />, category: ToolCategory.Custom, isNew: true, description: '相同穿搭改模特场景姿势' },
];

export const TAG_GROUPS: TagGroup[] = [
  {
    label: '主体',
    tags: ['模特', '女人', '男人', '女孩', '男孩']
  },
  {
    label: '动作',
    tags: ['抬头看向远方', '面对镜头向前走', '双手插在口袋', '背对着镜头站立', '左手插口袋', '左手摸嘴角', '侧身回头']
  }
];

export const SAMPLE_IMAGES = [
  'https://picsum.photos/id/64/400/400',
  'https://picsum.photos/id/177/400/400',
  'https://picsum.photos/id/338/400/400',
  'https://picsum.photos/id/823/400/400',
  'https://picsum.photos/id/1027/400/400'
];