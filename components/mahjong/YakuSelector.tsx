// components/mahjong/YakuSelector.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Yaku } from '@/types/mahjong';

interface YakuSelectorProps {
  yakuList: Yaku[];
  selectedYaku: Yaku[];
  toggleYaku: (yaku: Yaku) => void;
  title?: string;
}

export const YakuSelector: React.FC<YakuSelectorProps> = ({ 
  yakuList, 
  selectedYaku, 
  toggleYaku, 
  title 
}) => {
  return (
    <div>
      {title && <h4 className="text-sm font-medium mb-2 text-gray-700">{title}</h4>}
      <div className="grid grid-cols-3 gap-2">
        {yakuList?.map((yaku) => (
          <Button
            key={yaku.name}
            variant={selectedYaku.some(y => y.name === yaku.name) ? "default" : "outline"}
            onClick={() => toggleYaku(yaku)}
            className={`text-sm h-auto py-1.5 ${
              selectedYaku.some(y => y.name === yaku.name) 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-white hover:bg-gray-100 border-gray-300'
            }`}
          >
            {yaku.name}
          </Button>
        ))}
      </div>
    </div>
  );
};