import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// We call the Date constructor with the y year, m month, and day 0 to create the Date instance with the last date of the given month.
// Then we call getDate to get the value of the last day of the month m — 1according to the calendar.
// Therefore, the console log should log 29 since February 2020 has 29 days.
export const numDays = (y: number, m: number) => new Date(y, m, 0).getDate();

// console.log(numDays(2020, 2));
