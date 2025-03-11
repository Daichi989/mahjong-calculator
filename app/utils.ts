// app/utils.ts
import { ronPointTable, tsumoPointTable } from './constants';

// 役満判定とその名前を取得
export const getHandNameAndPoints = (han: number, fu: number) => {
  if (han >= 13) return { 
    name: "役満", 
    dealerRon: 48000, 
    childRon: 32000, 
    dealerTsumo: "16000オール", 
    childTsumo: "8000/16000" 
  };
  
  if (han >= 11) return { 
    name: "三倍満", 
    dealerRon: 36000, 
    childRon: 24000, 
    dealerTsumo: "12000オール", 
    childTsumo: "6000/12000" 
  };
  
  if (han >= 8) return { 
    name: "倍満", 
    dealerRon: 24000, 
    childRon: 16000, 
    dealerTsumo: "8000オール", 
    childTsumo: "4000/8000" 
  };
  
  if (han >= 6) return { 
    name: "跳満", 
    dealerRon: 18000, 
    childRon: 12000, 
    dealerTsumo: "6000オール", 
    childTsumo: "3000/6000" 
  };
  
  if (han >= 5) return { 
    name: "満貫", 
    dealerRon: 12000, 
    childRon: 8000, 
    dealerTsumo: "4000オール", 
    childTsumo: "2000/4000" 
  };
  
  // 符と翻の組み合わせによる満貫判定
  if (han === 4 && fu >= 40) return { 
    name: "満貫", 
    dealerRon: 12000, 
    childRon: 8000, 
    dealerTsumo: "4000オール", 
    childTsumo: "2000/4000" 
  };
  
  if (han === 3 && fu >= 70) return { 
    name: "満貫", 
    dealerRon: 12000, 
    childRon: 8000, 
    dealerTsumo: "4000オール", 
    childTsumo: "2000/4000" 
  };

  // 通常の点数計算
  return { 
    name: "", 
    dealerRon: ronPointTable[fu]?.dealer?.[han], 
    childRon: ronPointTable[fu]?.child?.[han],
    dealerTsumo: tsumoPointTable[fu]?.dealer?.[han],
    childTsumo: tsumoPointTable[fu]?.child?.[han]
  };
};