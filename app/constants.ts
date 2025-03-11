// app/constants.ts

// ロン和了時の点数表
export const ronPointTable = {
    20: { child: { 1: null, 2: 1300, 3: 2600, 4: 5200 }, dealer: { 1: null, 2: 2000, 3: 3900, 4:7700 } },
    25: { child: { 1:null , 2:1600 , 3: 3200 ,4:6400}, dealer: { 1: null, 2:2400 , 3:4800  ,4:9600} },
    30: { child: { 1: 1000, 2: 2000, 3: 3900 ,4:7700}, dealer: { 1: 1500, 2: 2900, 3: 5800 ,4:11600} },
    40: { child: { 1: 1300, 2: 2600, 3: 5200 }, dealer: { 1: 2000, 2: 3900, 3: 7700 } },
    50: { child: { 1: 1600, 2: 3200, 3: 6400 }, dealer: { 1: 2400, 2: 4800, 3: 9600 } },
    60: { child: { 1: 2000, 2: 3900, 3: 7700 }, dealer: { 1: 2900, 2: 5800, 3: 11600 } },
    70: { child: { 1: 2300, 2: 4500, 3: 8000 }, dealer: { 1: 3400, 2: 6800, 3: 12000 } }
  };
  
  // ツモ和了時の点数表
  export const tsumoPointTable = {
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
  
  // メンゼン状態の役の定義
  export const menzenYakuList = {
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
  
  // 鳴き状態の役の定義
  export const nakiYakuList = {
    han1: [
      { name: "白", value: 1 },
      { name: "発", value: 1 },
      { name: "中", value: 1 },
      { name: "自風牌", value: 1 },
      { name: "場風牌", value: 1 },
      { name: "タンヤオ", value: 1 },
      { name: "一盃口", value: 1 },
      { name: "海底撈月", value: 1 },
      { name: "河底撈魚", value: 1 },
      { name: "嶺上開花", value: 1 },
      { name: "槍槓", value: 1 },
      { name: "一気通貫", value: 1 }, // 食い下がり
      { name: "三色同順", value: 1 }, // 食い下がり
      { name: "チャンタ", value: 1 }, // 食い下がり
    ],
    han2: [
      { name: "三色同刻", value: 2 },
      { name: "三暗刻", value: 2 },
      { name: "対々和", value: 2 },
      { name: "三槓子", value: 2 },
      { name: "小三元", value: 2 },
      { name: "混老頭", value: 2 },
      { name: "混一色", value: 2 }, // 食い下がり
      { name: "純チャン", value: 2 }, // 食い下がり
    ],
    han5: [
      { name: "清一色", value: 5 }, // 食い下がり
    ],
    yakuman: [
      { name: "大三元", value: 13 },
      { name: "緑一色", value: 13 },
      { name: "小四喜", value: 13 },
      { name: "字一色", value: 13 },
      { name: "清老頭", value: 13 },
      { name: "四槓子", value: 13 },
    ],
    doubleYakuman: [
      { name: "大四喜", value: 26 },
    ]
  };
  
  // 符のオプション
  export const fuOptions = [20, 25, 30, 40, 50, 60, 70];