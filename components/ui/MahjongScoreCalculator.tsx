"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
  const [han, setHan] = useState(0);
  const [fu, setFu] = useState(30);
  const [score, setScore] = useState(null);
  const [selectedYaku, setSelectedYaku] = useState([]);
  const [doraCount, setDoraCount] = useState(0);
  const [handName, setHandName] = useState("");
  const [activeTab, setActiveTab] = useState("han1");

  // 選択された役に基づいてハン数を計算
  useEffect(() => {
    if (selectedYaku.length > 0 || doraCount > 0) {
      const totalHan = selectedYaku.reduce((sum, yaku) => sum + yaku.value, 0) + doraCount;
      setHan(totalHan);
    } else {
      setHan(0); // デフォルト値
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

  // 選択中の役の数
  const selectedYakuCount = (category) => {
    return selectedYaku.filter(yaku => 
      yakuList[category].some(item => item.name === yaku.name)
    ).length;
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 bg-gray-50 min-h-screen">
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">ざっくり麻雀点数計算くん</CardTitle>
          <p className="text-gray-600 text-sm">いつも友達に計算させているあなた🫵ぼくに任せて💪</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={han}
                    onChange={(e) => setHan(Number(e.target.value))}
                    min="1"
                    className="w-16 p-2 border rounded-md text-center text-lg font-semibold bg-white"
                  />
                  <span className="text-sm text-gray-600 mt-1">翻</span>
                </div>
                <span className="text-xl">×</span>
                <div className="flex flex-col items-center">
                  <select 
                    value={fu} 
                    onChange={(e) => setFu(Number(e.target.value))}
                    className="p-2 border rounded-md text-center text-lg font-semibold bg-white"
                  >
                    {[20, 25, 30, 40, 50, 60, 70].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-600 mt-1">符</span>
                </div>
              </div>
              <Button 
                onClick={calculateScore} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                計算
              </Button>
            </div>
            <a href="/hu" className="text-blue-600 text-sm flex items-center mt-2 hover:underline">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              簡単な符の求め方
            </a>
          </div>
          
          {score && typeof score !== 'string' && (
            <div className="border rounded-lg p-4 mt-4 bg-white shadow-sm">
              {handName && <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">{handName}</div>}
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
          )}
          {typeof score === 'string' && (
            <p className="text-center text-red-500 font-semibold p-2 bg-red-50 rounded-md mt-4">{score}</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">選択中の役</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-2">
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
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <div className="flex items-center space-x-2">
              <span className="font-medium">ドラ：</span>
              <div className="flex items-center space-x-1">
                <Button 
                  onClick={() => setDoraCount(Math.max(0, doraCount - 1))} 
                  className="h-7 w-7 rounded-full p-0 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                  variant="outline"
                >
                  -
                </Button>
                <span className="w-6 text-center font-semibold">{doraCount}</span>
                <Button 
                  onClick={() => setDoraCount(doraCount + 1)} 
                  className="h-7 w-7 rounded-full p-0 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="font-bold text-blue-700">合計: {han || 0}飜</div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md overflow-hidden">
        <Tabs defaultValue="han1" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-bold mb-2">役選択</CardTitle>
            <TabsList className="grid grid-cols-4 bg-gray-100">
              <TabsTrigger value="han1" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 relative">
                1飜役
                {selectedYakuCount('han1') > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('han1')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="han2-3" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 relative">
                2-3飜役
                {(selectedYakuCount('han2') + selectedYakuCount('han3')) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('han2') + selectedYakuCount('han3')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="han5-6" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 relative">
                5-6飜役
                {(selectedYakuCount('han5') + selectedYakuCount('han6')) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('han5') + selectedYakuCount('han6')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="yakuman" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 relative">
                役満
                {(selectedYakuCount('yakuman') + selectedYakuCount('doubleYakuman')) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('yakuman') + selectedYakuCount('doubleYakuman')}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-4">
            <TabsContent value="han1" className="mt-0">
              <div className="grid grid-cols-3 gap-2">
                {yakuList.han1.map((yaku) => (
                  <Button
                    key={yaku.name}
                    variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                    onClick={() => toggleYaku(yaku)}
                    className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                  >
                    {yaku.name}
                  </Button>
                ))}
                <Button
                  variant={doraCount > 0 ? "default" : "outline"}
                  onClick={() => setDoraCount(doraCount > 0 ? 0 : 1)}
                  className={`text-sm h-auto py-1.5 ${doraCount > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                >
                  ドラ
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="han2-3" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">2飜役</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.han2.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">3飜役</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.han3.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="han5-6" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">5飜役</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.han5.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">6飜役</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.han6.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="yakuman" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">役満</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.yakuman.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-700">ダブル役満</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {yakuList.doubleYakuman.map((yaku) => (
                      <Button
                        key={yaku.name}
                        variant={isYakuSelected(yaku.name) ? "default" : "outline"}
                        onClick={() => toggleYaku(yaku)}
                        className={`text-sm h-auto py-1.5 ${isYakuSelected(yaku.name) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                      >
                        {yaku.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MahjongScoreCalculator;