// components/ui/MahjongScoreCalculator.tsx
"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// 抽出した定数と関数をインポート
import { 
  menzenYakuList, 
  nakiYakuList, 
  fuOptions 
} from "@/app/constants";
import { getHandNameAndPoints } from "@/app/utils";
import { Yaku, Score, YakuList } from "@/types/mahjong";

// 分割したコンポーネントをインポート
import { ScoreDisplay } from '@/components/mahjong/ScoreDisplay';
import { SelectedYakuList } from '@/components/mahjong/SelectedYakuList';
import { DoraCounter } from '@/components/mahjong/DoraCounter';
import { YakuSelector } from '@/components/mahjong/YakuSelector';

const MahjongScoreCalculator = () => {
  const [han, setHan] = useState<number>(0);
  const [fu, setFu] = useState<number>(30);
  const [score, setScore] = useState<Score | null>(null);
  const [selectedYaku, setSelectedYaku] = useState<Yaku[]>([]);
  const [doraCount, setDoraCount] = useState<number>(0);
  const [handName, setHandName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("han1");
  const [yakuTab, setYakuTab] = useState<string>("menzen");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 選択された役に基づいてハン数を計算
  useEffect(() => {
    if (selectedYaku.length > 0 || doraCount > 0) {
      const totalHan = selectedYaku.reduce((sum, yaku) => sum + yaku.value, 0) + doraCount;
      setHan(totalHan);
    } else {
      setHan(0);
    }
  }, [selectedYaku, doraCount]);

  // メンゼン/鳴き切り替え時に選択中の役をクリア
  useEffect(() => {
    setSelectedYaku([]);
    setDoraCount(0);
  }, [yakuTab]);

  // 現在の状態に応じた役リストを取得
  const getCurrentYakuList = (): YakuList => {
    return yakuTab === "menzen" ? menzenYakuList : nakiYakuList;
  };

  // 役を選択・解除する処理
  const toggleYaku = (yaku: Yaku) => {
    const isSelected = selectedYaku.some(item => item.name === yaku.name);
    
    if (isSelected) {
      setSelectedYaku(selectedYaku.filter(item => item.name !== yaku.name));
    } else {
      setSelectedYaku([...selectedYaku, yaku]);
    }
  };

  const calculateScore = () => {
    setErrorMessage(null);
    
    if (han < 1) {
      setErrorMessage("無効な役");
      setHandName("");
      setScore(null);
      return;
    }

    const handInfo = getHandNameAndPoints(han, fu);
    setHandName(handInfo.name);

    if (!handInfo.childRon || !handInfo.dealerRon || !handInfo.dealerTsumo || !handInfo.childTsumo) {
      setErrorMessage("無効な符・翻の組み合わせ");
      setHandName("");
      setScore(null);
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

  // 選択中の役の数
  const selectedYakuCount = (category: string): number => {
    const currentYakuList = getCurrentYakuList();
    return selectedYaku.filter(yaku => 
      currentYakuList[category]?.some(item => item.name === yaku.name)
    ).length;
  };

  const currentYakuList = getCurrentYakuList();

  // ドラボタンのトグル処理
  const toggleDora = () => {
    setDoraCount(doraCount > 0 ? 0 : 1);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* ヘッダーカード */}
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">ざっくり麻雀点数計算くん</CardTitle>
          <p className="text-gray-600 text-sm">いつも友達に計算させているあなた🫵ぼくに任せて💪</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* メンゼン/鳴き切り替え */}
          <div className="flex justify-between items-center">
           
            <a href="/hu" className="text-blue-600 text-sm flex items-center hover:underline">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              簡単な符の求め方
            </a>
          </div>

          {/* 翻・符入力セクション */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={han}
                    onChange={(e) => setHan(Number(e.target.value))}
                    min="0"
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
                    {fuOptions.map((f) => (
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
          </div>
          
          {/* 計算結果表示 */}
          <ScoreDisplay 
            score={score} 
            handName={handName} 
            errorMessage={errorMessage} 
          />
        </CardContent>
      </Card>

      {/* 選択中の役表示カード */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">選択中の役</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <SelectedYakuList 
              selectedYaku={selectedYaku} 
              toggleYaku={toggleYaku} 
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <DoraCounter count={doraCount} setCount={setDoraCount} />
            <div className="font-bold text-blue-700">合計: {han || 0}飜</div>
          </div>
        </CardContent>
      </Card>

      {/* 役選択カード */}
      <Card className="shadow-md overflow-hidden">
        <Tabs defaultValue="han1" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-bold mb-2">
              {yakuTab === "menzen" ? "メンゼン役" : "鳴き役"} 選択
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="menzen-switch"
                checked={yakuTab === "menzen"}
                onCheckedChange={(checked) => setYakuTab(checked ? "menzen" : "naki")}
              />
              <Label htmlFor="menzen-switch" className="font-medium">
                {yakuTab === "menzen" ? "メンゼン" : "鳴き"}
              </Label>
            </div>
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
                {yakuTab === "menzen" ? "2-3飜役" : "2飜役"}
                {(selectedYakuCount('han2') + (yakuTab === "menzen" ? selectedYakuCount('han3') : 0)) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('han2') + (yakuTab === "menzen" ? selectedYakuCount('han3') : 0)}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="han5-6" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 relative">
                {yakuTab === "menzen" ? "5-6飜役" : "5飜役"}
                {(selectedYakuCount('han5') + (yakuTab === "menzen" ? selectedYakuCount('han6') : 0)) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {selectedYakuCount('han5') + (yakuTab === "menzen" ? selectedYakuCount('han6') : 0)}
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
            {/* 1飜役タブの内容 */}
            <TabsContent value="han1" className="mt-0">
              <YakuSelector
                yakuList={currentYakuList.han1 || []}
                selectedYaku={selectedYaku}
                toggleYaku={toggleYaku}
              />
              <div className="mt-2">
                <Button
                  variant={doraCount > 0 ? "default" : "outline"}
                  onClick={toggleDora}
                  className={`text-sm h-auto py-1.5 ${
                    doraCount > 0 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-white hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  ドラ
                </Button>
              </div>
            </TabsContent>

            {/* 2-3飜役タブの内容 */}
            <TabsContent value="han2-3" className="mt-0">
              <div className="space-y-4">
                <YakuSelector
                  yakuList={currentYakuList.han2 || []}
                  selectedYaku={selectedYaku}
                  toggleYaku={toggleYaku}
                  title="2飜役"
                />
                
                {yakuTab === "menzen" && currentYakuList.han3 && (
                  <YakuSelector
                    yakuList={currentYakuList.han3}
                    selectedYaku={selectedYaku}
                    toggleYaku={toggleYaku}
                    title="3飜役"
                  />
                )}
              </div>
            </TabsContent>

            {/* 5-6飜役タブの内容 */}
            <TabsContent value="han5-6" className="mt-0">
              <div className="space-y-4">
                <YakuSelector
                  yakuList={currentYakuList.han5 || []}
                  selectedYaku={selectedYaku}
                  toggleYaku={toggleYaku}
                  title="5飜役"
                />
                
                {yakuTab === "menzen" && currentYakuList.han6 && (
                  <YakuSelector
                    yakuList={currentYakuList.han6}
                    selectedYaku={selectedYaku}
                    toggleYaku={toggleYaku}
                    title="6飜役"
                  />
                )}
              </div>
            </TabsContent>

            {/* 役満タブの内容 */}
            <TabsContent value="yakuman" className="mt-0">
              <div className="space-y-4">
                <YakuSelector
                  yakuList={currentYakuList.yakuman || []}
                  selectedYaku={selectedYaku}
                  toggleYaku={toggleYaku}
                  title="役満"
                />
                
                {currentYakuList.doubleYakuman && currentYakuList.doubleYakuman.length > 0 && (
                  <YakuSelector
                    yakuList={currentYakuList.doubleYakuman}
                    selectedYaku={selectedYaku}
                    toggleYaku={toggleYaku}
                    title="ダブル役満"
                  />
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MahjongScoreCalculator;