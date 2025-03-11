// components/mahjong/DoraCounter.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface DoraCounterProps {
  count: number;
  setCount: (count: number) => void;
}

export const DoraCounter: React.FC<DoraCounterProps> = ({ count, setCount }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">ドラ：</span>
      <div className="flex items-center space-x-1">
        <Button 
          onClick={() => setCount(Math.max(0, count - 1))} 
          className="h-7 w-7 rounded-full p-0 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
          variant="outline"
        >
          -
        </Button>
        <span className="w-6 text-center font-semibold">{count}</span>
        <Button 
          onClick={() => setCount(count + 1)} 
          className="h-7 w-7 rounded-full p-0 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
          variant="outline"
        >
          +
        </Button>
      </div>
    </div>
  );
};