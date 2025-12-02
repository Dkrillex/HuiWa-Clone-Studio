import React from 'react';
import { GeneratedImage, GenerationStatus } from '../types';
import { ProductBgSwapEmptyState } from './ProductBgSwapEmptyState';
import { WatermarkRemovalEmptyState } from './WatermarkRemovalEmptyState';
import { GenericEmptyState } from './GenericEmptyState';
import { GenerationResult } from './GenerationResult';

interface ResultsGalleryProps {
  originalImage: string | null;
  generatedImage: GeneratedImage | null;
  status: GenerationStatus;
  toolName: string;
  toolId: string;
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ 
  originalImage, 
  generatedImage, 
  status,
  toolId
}) => {
  const isBgSwap = toolId === 'bg-swap-product';
  const isWatermark = toolId === 'remove-watermark';

  if (!originalImage && status === GenerationStatus.Idle) {
    if (isBgSwap) {
        return <ProductBgSwapEmptyState />;
    }

    if (isWatermark) {
        return <WatermarkRemovalEmptyState />;
    }

    return <GenericEmptyState />;
  }

  return (
    <GenerationResult 
      originalImage={originalImage}
      generatedImage={generatedImage}
      status={status}
      isBgSwap={isBgSwap}
      isWatermark={isWatermark}
    />
  );
};