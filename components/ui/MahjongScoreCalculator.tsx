"use client"

import React, { useState, useEffect } from "react";
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
    child: { 1: "400/700", 2: "700/1300", 3: "1300/2600", 4: "2000/4000" },
    dealer: { 1: "700", 2: "1300", 3: "2600", 4: "4000" }
  },
  50: {
    child: { 1: "400/800", 2: "800/1600", 3: "1600/3200", 4: "2000/4000" },
    dealer: { 1: "800", 2: "1600", 3: "3200", 4: "4000" }
  },
  60: {
    child: { 1: "500/1000", 2: "1000/2000", 3: "2000/3900", 4: "2000/4000" },
    dealer: { 1: "1000", 2: "2000", 3: "3900", 4: "4000" }
  },
  70: {
    child: { 1: "600/1200", 2: "1200/2300", 3: "2000/4000", 4: "2000/4000" },
    dealer: { 1: "1200", 2: "2300", 3: "4000", 4: "4000" }
  }
};

// 役の定義
const yakuList = {
  han1: [
    { name: "立直", value: 1 },
    { name: "一発", value: 1 },
    { name: "面前清自摸和", value: 1 },
    { name: "白", value: 1 },
    { name: "発", value: 1 },
    { name: "中", value: 1 },
    { name: "自風牌", value: 1 },
    { name: "場風牌", value: 1 },
    { name: "タンヤオ", value: 1 },
    { name: "平和", value: 1 },
    { name: "一盃口", value: 1 },
    { name: "海底撈月", value: 1 },
    { name: "河底撈魚", value: 1 },
    { name: "嶺上開花", value: 1 },
    { name: "槍槓", value: 1 },
  ],
  han2: [
    { name: "ダブル立直", value: 2 },
    { name: "三色同順", value: 2 },
    { name: "三色同刻", value: 2 },
    { name: "三暗刻", value: 2 },
    { name: "一気通貫", value: 2 },
    { name: "チャンタ", value: 2 },
    { name: "七対子", value: 2 },
    { name: "対々和", value: 2 },
    { name: "三槓子", value: 2 },
    { name: "小三元", value: 2 },
    { name: "混老頭", value: 2 },
  ],
  han3: [
    { name: "二盃口", value: 3 },
    { name: "純チャン", value: 3 },
    { name: "混一色", value: 3 },
  ],
  han5: [
    { name: "流し満貫", value: 5 },
  ],
  han6: [
    { name: "清一色", value: 6 },
  ],
  yakuman: [
    { name: "天和", value: 13 },
    { name: "地和", value: 13 },
    { name: "人和", value: 13 },
    { name: "四暗刻", value: 13 },
    { name: "国士無双", value: 13 },
    { name: "大三元", value: 13 },
    { name: "緑一色", value: 13 },
    { name: "小四喜", value: 13 },
    { name: "字一色", value: 13 },
    { name: "清老頭", value: 13 },
    { name: "四槓子", value: 13 },
    { name: "九蓮宝燈", value: 13 },
  ],
  doubleYakuman: [
    { name: "四暗刻単騎", value: 26 },
    { name: "大四喜", value: 26 },
    { name: "純正九蓮宝燈", value: 26 },
    { name: "国士無双十三面待ち", value: 26 },
  ]
};

const MahjongScoreCalculator = () => {
  const [han, setHan] = useState(1);
  const [fu, setFu] = useState(30);
  const [score, setScore] = useState(null);
  const [selectedYaku, setSelectedYaku] = useState([]);
  const [doraCount, setDoraCount] = useState(0);
  const [handName, setHandName] = useState("");

  // 選択された役に基づいてハン数を計算
  useEffect(() => {
    if (selectedYaku.length > 0 || doraCount > 0) {
      const totalHan = selectedYaku.reduce((sum, yaku) => sum + yaku.value, 0) + doraCount;
      setHan(totalHan);
    } else {
      setHan(1); // デフォルト値
    }
  }, [selectedYaku, doraCount]);

  // 役を選択・解除する処理
  const toggleYaku = (yaku) => {
    const isSelected = selectedYaku.some(item => item.name === yaku.name);
    
    if (isSelected) {
      setSelectedYaku(selectedYaku.filter(item => item.name !== yaku.name));
    } else {
      setSelectedYaku([...selectedYaku, yaku]);
    }
  };

  // 役満判定とその名前を取得
  const getHandNameAndPoints = (han, fu) => {
    if (han >= 13) return { name: "役満", dealerRon: 48000, childRon: 32000, dealerTsumo: "16000オール", childTsumo: "8000/16000" };
    if (han >= 11) return { name: "三倍満", dealerRon: 36000, childRon: 24000, dealerTsumo: "12000オール", childTsumo: "6000/12000" };
    if (han >= 8) return { name: "倍満", dealerRon: 24000, childRon: 16000, dealerTsumo: "8000オール", childTsumo: "4000/8000" };
    if (han >= 6) return { name: "跳満", dealerRon: 18000, childRon: 12000, dealerTsumo: "6000オール", childTsumo: "3000/6000" };
    if (han >= 5) return { name: "満貫", dealerRon: 12000, childRon: 8000, dealerTsumo: "4000オール", childTsumo: "2000/4000" };
    
    // 符と翻の組み合わせによる満貫判定
    if (han === 4 && fu >= 40) return { name: "満貫", dealerRon: 12000, childRon: 8000, dealerTsumo: "4000オール", childTsumo: "2000/4000" };
    if (han === 3 && fu >= 70) return { name: "満貫", dealerRon: 12000, childRon: 8000, dealerTsumo: "4000オール", childTsumo: "2000/4000" };

    // 通常の点数計算
    return { 
      name: "", 
      dealerRon: ronPointTable[fu]?.dealer?.[han], 
      childRon: ronPointTable[fu]?.child?.[han],
      dealerTsumo: tsumoPointTable[fu]?.dealer?.[han],
      childTsumo: tsumoPointTable[fu]?.child?.[han]
    };
  };

  const calculateScore = () => {
    if (han < 1) {
      setScore("無効な役");
      setHandName("");
      return;
    }

    const handInfo = getHandNameAndPoints(han, fu);
    setHandName(handInfo.name);

    if (!handInfo.childRon || !handInfo.dealerRon || !handInfo.dealerTsumo || !handInfo.childTsumo) {
      setScore("無効な符・翻の組み合わせ");
      setHandName("");
      return;
    }

    setScore({
      ron: {
        dealer: handInfo.dealerRon,
        child: handInfo.childRon
      },
      tsumoDealer: handInfo.dealerTsumo,
      tsumoChild: handInfo.childTsumo
    });
  };

  // ボタンの活性状態を判定
  const isYakuSelected = (yakuName) => {
    return selectedYaku.some(yaku => yaku.name === yakuName);
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">麻雀点数計算</h2>
          <p>いつも友達に計算させているあなた🫵ぼくに任せて💪</p>
          <a href="">💡簡単な符の求め方</a>

          <div className="flex space-x-2 items-center">
            <input
              type="number"
              placeholder="翻数"
              value={han}
              onChange={(e) => setHan(Number(e.target.value))}
              min="1"
              className="w-16 p-1 border rounded"
            /> 翻
            <select 
              value={fu} 
              onChange={(e) => setFu(Number(e.target.value))}
              className="p-1 border rounded"
            >
              {[20, 25, 30, 40, 50, 60, 70].map((f) => (
                <option key={f} value={f}>{f} 符</option>
              ))}
            </select>
          </div>

          <Button onClick={calculateScore} className="w-full">計算</Button>
          
          {score && typeof score !== 'string' && (
            <div className="space-y-2 mt-4">
              {handName && <p className="font-bold text-green-600">{handName}</p>}
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

      <Card>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-bold">選択中の役</h3>
          {selectedYaku.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedYaku.map((yaku) => (
                <span key={yaku.name} className="bg-blue-100 px-2 py-1 rounded text-sm">
                  {yaku.name} ({yaku.value}飜)
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">役が選択されていません</p>
          )}

          <div className="flex items-center space-x-2">
            <span>ドラ：</span>
            <Button 
              onClick={() => setDoraCount(Math.max(0, doraCount - 1))} 
              className="px-2 py-1 h-8 min-h-0"
              variant="outline"
            >
              -
            </Button>
            <span className="w-8 text-center">{doraCount}</span>
            <Button 
              onClick={() => setDoraCount(doraCount + 1)} 
              className="px-2 py-1 h-8 min-h-0"
              variant="outline"
            >
              +
            </Button>
          </div>

          <p className="font-bold">合計: {han}飜</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="border rounded p-3">
          <p className="font-bold mb-2">1飜役</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.han1.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
            <Button
              size="sm"
              variant={doraCount > 0 ? "default" : "outline"}
              onClick={() => setDoraCount(doraCount > 0 ? 0 : 1)}
              className="text-xs p-1 h-auto"
            >
              ドラ
            </Button>
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">2飜役</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.han2.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">3飜役</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.han3.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">5飜役</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.han5.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">6飜役</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.han6.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">役満</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.yakuman.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="border rounded p-3">
          <p className="font-bold mb-2">ダブル役満</p>
          <div className="flex flex-wrap gap-2">
            {yakuList.doubleYakuman.map((yaku) => (
              <Button
                key={yaku.name}
                size="sm"
                variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                onClick={() => toggleYaku(yaku)}
                className="text-xs p-1 h-auto"
              >
                {yaku.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahjongScoreCalculator;