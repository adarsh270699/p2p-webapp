import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await func(...args);
    }, timeout);
  };
}

export function controlUpdateFreq<Params extends any[]>(
  func: (...args: Params) => any,
  freq: number
): (...args: Params) => void {
  let flag = true;
  return async (...args: Params) => {
    if (flag) {
      await func(...args);
      flag = false;
      setTimeout(async () => {
        flag = true;
      }, freq);
    }
  };
}

/* eslint-enable @typescript-eslint/no-explicit-any*/
