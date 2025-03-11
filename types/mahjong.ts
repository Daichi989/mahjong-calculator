export type Yaku = {
  name: string;
  value: number;
};

export type YakuList = {
  han1: Yaku[];
  han2: Yaku[];
  han3: Yaku[];
  han5: Yaku[];
  han6: Yaku[];
  yakuman: Yaku[];
  doubleYakuman: Yaku[];
};

export type Score = {
  ron: {
    dealer: number;
    child: number;
  };
  tsumoDealer: string;
  tsumoChild: string;
};

export type HandInfo = {
  name: string;
  dealerRon: number;
  childRon: number;
  dealerTsumo: string;
  childTsumo: string;
}; 