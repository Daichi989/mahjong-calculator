// components/mahjong/ScoreDisplay.tsx
import React from 'react';
import { Score } from '@/types/mahjong';

interface ScoreDisplayProps {
  score: Score | null;
  handName: string;
  errorMessage: string | null;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  handName, 
  errorMessage 
}) => {
  if (errorMessage) {
    return (
      <p className="text-center text-red-500 font-semibold p-2 bg-red-50 rounded-md mt-4">
        {errorMessage}
      </p>
    );
  }

  if (!score) return null;

  return (
    <div className="border rounded-lg p-4 mt-4 bg-white shadow-sm">
      {handName && (
        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
          {handName}
        </div>
      )}
      <p className="text-2xl font-bold text-center mb-3">{score.ron.child.toLocaleString()}点</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-700 font-semibold mb-1">親</p>
          <p className="text-lg">{score.ron.dealer.toLocaleString()}点</p>
          <p className="text-gray-600 text-sm">ツモ: {score.tsumoDealer}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-700 font-semibold mb-1">子</p>
          <p className="text-lg">{score.ron.child.toLocaleString()}点</p>
          <p className="text-gray-600 text-sm">ツモ: {score.tsumoChild}</p>
        </div>
      </div>
    </div>
  );
};