// components/mahjong/SelectedYakuList.tsx
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Yaku } from '@/types/mahjong';

interface SelectedYakuListProps {
  selectedYaku: Yaku[];
  toggleYaku: (yaku: Yaku) => void;
}

export const SelectedYakuList: React.FC<SelectedYakuListProps> = ({ 
  selectedYaku, 
  toggleYaku 
}) => {
  return (
    <div className="flex flex-wrap gap-1 flex-1">
      {selectedYaku.length > 0 ? (
        selectedYaku.map((yaku) => (
          <Badge 
            key={yaku.name} 
            variant="secondary"
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer"
            onClick={() => toggleYaku(yaku)}
          >
            {yaku.name} ({yaku.value}飜)
          </Badge>
        ))
      ) : (
        <p className="text-gray-500 text-sm italic">役が選択されていません</p>
      )}
    </div>
  );
};