"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ronPointTable = {
  20: { child: { 1: null, 2: 1300, 3: 2600, 4: 5200 }, dealer: { 1: null, 2: 2000, 3: 3900, 4:7700 } },
  25: { child: { 1:null , 2:1600 , 3: 3200 ,4:6400}, dealer: { 1: null, 2:2400 , 3:4800  ,4:9600} },
  30: { child: { 1: 1000, 2: 2000, 3: 3900 ,4:7700}, dealer: { 1: 1500, 2: 2900, 3: 5800 ,4:11600} },
  40: { child: { 1: 1300, 2: 2600, 3: 5200 }, dealer: { 1: 2000, 2: 3900, 3: 7700 } },
  50: { child: { 1: 1600, 2: 3200, 3: 6400 }, dealer: { 1: 2400, 2: 4800, 3: 9600 } },
  60: { child: { 1: 2000, 2: 3900, 3: 7700 }, dealer: { 1: 2900, 2: 5800, 3: 11600 } },
  70: { child: { 1: 2300, 2: 4500, 3: 8000 }, dealer: { 1: 3400, 2: 6800, 3: 12000 } }
};

const tsumoPointTable = {
  20: { 
    child: { 1: null, 2: "400/700", 3: "700/1300", 4: "1300/2600" },
    dealer: { 1: null, 2: "700", 3: "1300", 4: "2600" }
  },
  25: {
    child: { 1: null, 2: "400/800", 3: "800/1600", 4: "1600/3200" },
    dealer: { 1: null, 2: "800", 3: "1600", 4: "3200" }
  },
  30: {
    child: { 1: "300/500", 2: "500/1000", 3: "1000/2000", 4: "2000/3900" },
    dealer: { 1: "500", 2: "1000", 3: "2000", 4: "3900" }
  },
  40: {
    child: { 1: "400/700", 2: "700/1300", 3: "1300/2600", 4: "2600/5200" },
    dealer: { 1: "700", 2: "1300", 3: "2600", 4: "5200" }
  },
  50: {
    child: { 1: "400/800", 2: "800/1600", 3: "1600/3200", 4: "3200/6400" },
    dealer: { 1: "800", 2: "1600", 3: "3200", 4: "6400" }
  },
  60: {
    child: { 1: "500/1000", 2: "1000/2000", 3: "2000/3900", 4: "3900/7700" },
    dealer: { 1: "1000", 2: "2000", 3: "3900", 4: "7700" }
  },
  70: {
    child: { 1: "600/1200", 2: "1200/2300", 3: "2000/4000", 4: "4000/8000" },
    dealer: { 1: "1200", 2: "2300", 3: "4000", 4: "8000" }
  }
};

const MahjongScoreCalculator = () => {
  const [han, setHan] = useState(1);
  const [fu, setFu] = useState(30);  // 初期値を30に変更
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    if (han < 1) {
      setScore("無効な役");
      return;
    }

    let ronPoints, tsumoPointsDealer, tsumoPointsChild;
    
    if (han >= 13) {
      ronPoints = { dealer: 48000, child: 32000 };
      tsumoPointsDealer = "16000オール";
      tsumoPointsChild = "16000/32000";
    } else if (han >= 11) {
      ronPoints = { dealer: 36000, child: 24000 };
      tsumoPointsDealer = "12000オール";
      tsumoPointsChild = "12000/24000";
    } else if (han >= 8) {
      ronPoints = { dealer: 24000, child: 16000 };
      tsumoPointsDealer = "8000オール";
      tsumoPointsChild = "8000/16000";
    } else if (han >= 6) {
      ronPoints = { dealer: 18000, child: 12000 };
      tsumoPointsDealer = "6000オール";
      tsumoPointsChild = "6000/12000";
    } else if (han >= 5) {
      ronPoints = { dealer: 12000, child: 8000 };
      tsumoPointsDealer = "4000オール";
      tsumoPointsChild = "4000/8000";
    } else {
      ronPoints = {
        dealer: ronPointTable[fu]?.dealer?.[han],
        child: ronPointTable[fu]?.child?.[han]
      };
      tsumoPointsDealer = tsumoPointTable[fu]?.dealer?.[han];
      tsumoPointsChild = tsumoPointTable[fu]?.child?.[han];
    }

    if (!ronPoints.child || !ronPoints.dealer || !tsumoPointsDealer || !tsumoPointsChild) {
      setScore("無効な符・翻の組み合わせ");
      return;
    }

    setScore({
      ron: ronPoints,
      tsumoDealer: tsumoPointsDealer,
      tsumoChild: tsumoPointsChild
    });
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">麻雀点数計算</h2>
          <input
            type="number"
            placeholder="翻数"
            value={han}
            onChange={(e) => setHan(Number(e.target.value))}
            min="1"
          /> 翻
          <select value={fu} onChange={(e) => setFu(Number(e.target.value))}>
            {[20, 25, 30, 40, 50, 60, 70].map((f) => (
              <option key={f} value={f}>{f} 符</option>
            ))}
          </select>
          <Button onClick={calculateScore}>計算</Button>
          
          {score && typeof score !== 'string' && (
            <div className="space-y-2 mt-4">
              <p className="text-xl font-bold">{score.ron.child}点</p>
              <p>親：{score.ron.dealer}点 ({score.tsumoDealer})</p>
              <p>子：{score.ron.child}点 ({score.tsumoChild})</p>
            </div>
          )}
          {typeof score === 'string' && (
            <p className="text-lg text-red-500">{score}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MahjongScoreCalculator;