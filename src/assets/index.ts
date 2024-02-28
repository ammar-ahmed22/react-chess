import type { PieceType, Color } from "@ammar-ahmed22/chess-engine";
import { CasesPieceMap } from "./cases";
import { NeoPieceMap } from "./neo";

export type PieceImageMap = {
  [K in Color]: {
    [M in PieceType]: string;
  };
};

export type PieceSet = "cases" | "neo";

export type PieceImageSet = {
  [K in PieceSet]: PieceImageMap;
};

const pieceSets: PieceImageSet = {
  cases: CasesPieceMap,
  neo: NeoPieceMap,
};

export default pieceSets;
