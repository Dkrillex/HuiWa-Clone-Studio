import React from 'react';

export enum ToolCategory {
  ProductOnBody = 'ProductOnBody',
  Variations = 'Variations',
  Creation = 'Creation',
  Enterprise = 'Enterprise',
  Custom = 'Custom'
}

export interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: ToolCategory;
  isNew?: boolean;
  isHot?: boolean;
  description: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum GenerationStatus {
  Idle = 'idle',
  Uploading = 'uploading',
  Generating = 'generating',
  Success = 'success',
  Error = 'error'
}

export interface TagGroup {
  label: string;
  tags: string[];
}

export interface Preset {
  id: string;
  name: string;
  image?: string;
  icon?: React.ReactNode;
  prompt: string;
}

export interface ProductCategory {
  id: string;
  label: string;
}