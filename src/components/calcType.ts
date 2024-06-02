import { create } from "zustand";

export interface UseCalcType {
  calcType: string;
  set: (calcType: string) => void;
}

export const useCalcType = create<UseCalcType>((set) => ({
  calcType: "full",

  set: (calcType: string) => set(() => ({ calcType: calcType })),
}));
