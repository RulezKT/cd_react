import { create } from "zustand";

export interface UseTypeOfChart {
  typeOfChart: string;
  set: (chartType: string) => void;
}

export const useTypeOfChart = create<UseTypeOfChart>((set) => ({
  typeOfChart: "bodygraph",

  set: (chartType: string) => set(() => ({ typeOfChart: chartType })),
}));
