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
import { Tool, ToolCategory, TagGroup, Preset, ProductCategory } from './types';

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

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    { id: 'bag', label: '箱包' },
    { id: 'shoe', label: '鞋靴' },
    { id: 'clothing', label: '服装' },
    { id: 'beauty', label: '美妆' },
    { id: 'furniture', label: '家居' },
    { id: 'other', label: '其他' }
];

export const BG_PRESETS: Preset[] = [
    {
        id: 'wood-hanger',
        name: '木棍衣杆',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=100&q=80',
        prompt: 'hanging on a minimal wooden clothes rack, clean studio background, soft daylight'
    },
    {
        id: 'light-wood',
        name: '浅色木枝',
        image: 'https://images.unsplash.com/photo-1515463138280-67d1dcbf3175?auto=format&fit=crop&w=100&q=80',
        prompt: 'placed on light colored natural wood texture, artistic dried branches nearby, soft warm lighting, beige tones'
    },
    {
        id: 'white-yarn',
        name: '白纱柔风',
        image: 'https://images.unsplash.com/photo-1505322747496-063f78a876a4?auto=format&fit=crop&w=100&q=80',
        prompt: 'placed on soft white flowing chiffon fabric, dreamy ethereal lighting, elegant high-end style'
    },
    {
        id: 'stone-podium',
        name: '石膏展台',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=100&q=80',
        prompt: 'placed on a geometric white plaster podium, minimalist architectural style, hard shadows, modern look'
    },
    {
        id: 'nature',
        name: '自然光影',
        image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=100&q=80',
        prompt: 'outdoors in a lush garden, dappled sunlight through leaves, natural bokeh background'
    },
    {
        id: 'custom',
        name: '自定义',
        icon: <Palette size={24} />,
        prompt: ''
    }
];

export const BG_SWAP_SAMPLES = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80', // Bag
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80', // Shoe
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80', // Sofa
    'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=200&q=80', // Skincare
    'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=200&q=80', // Lipstick
];

export const WATERMARK_SAMPLES = [
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1505322747496-063f78a876a4?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80',
];

export const WATERMARK_CASES = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        label: 'Portrait'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
        label: 'Landscape'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        label: 'Men'
    },
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80',
        label: 'Indoor'
    }
];