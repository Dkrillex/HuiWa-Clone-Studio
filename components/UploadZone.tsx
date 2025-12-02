import React, { useRef } from 'react';
import { Upload, FolderOpen, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  selectedImage: string | null;
  onImageSelect: (base64: string) => void;
  title?: string;
  subtitle?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ 
    selectedImage, 
    onImageSelect,
    title = "上传模特图",
    subtitle = "图片大小20K~15M，分辨率大于400*400"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert("File size too large (Max 15MB)");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl relative overflow-hidden group transition-all hover:border-red-200">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      
      {selectedImage ? (
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-100 flex items-center justify-center">
           <img src={selectedImage} alt="Uploaded" className="max-w-full max-h-full object-contain" />
           <button 
             onClick={() => fileInputRef.current?.click()}
             className="absolute bottom-4 right-4 bg-white/80 backdrop-blur text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white shadow-sm"
           >
             更换图片
           </button>
        </div>
      ) : (
        <div className="w-full aspect-square md:aspect-[4/3] flex flex-col items-center justify-center text-gray-400">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-400">
             <ImageIcon size={32} />
          </div>
          <h3 className="text-gray-700 font-medium mb-1">{title}</h3>
          
          <div className="flex gap-3 mt-4">
             <button className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 shadow-md shadow-blue-200 transition-transform active:scale-95">
               <FolderOpen size={16} />
               从作品选择
             </button>
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-transform active:scale-95"
             >
               <Upload size={16} />
               从本地上传
             </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">{subtitle}</p>
        </div>
      )}
    </div>
  );
};