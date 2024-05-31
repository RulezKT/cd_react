import { create } from "zustand";

export interface UseTypeOfChart {
  typeOfChart: string;
  set: (chartType: string) => void;
}

export const useTypeOfChart = create<UseTypeOfChart>((set) => ({
  typeOfChart: "personality",

  set: (chartType: string) => set(() => ({ typeOfChart: chartType })),
}));
