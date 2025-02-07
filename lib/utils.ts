import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimestamp = (createdAt:Date):string=>{
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInWeek = 7 * secondsInDay;
  const secondsInMonth = 30 * secondsInDay; // Approximate
  const secondsInYear = 365 * secondsInDay; // Approximate

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < secondsInHour) {
    return `${Math.floor(diffInSeconds / secondsInMinute)} minutes ago`;
  } else if (diffInSeconds < secondsInDay) {
    return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
  } else if (diffInSeconds < secondsInWeek) {
    return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
  } else if (diffInSeconds < secondsInMonth) {
    return `${Math.floor(diffInSeconds / secondsInWeek)} weeks ago`;
  } else if (diffInSeconds < secondsInYear) {
    return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
  }
}

export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();

  const suffixes = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
  let i = 0;

  while (num >= 1000 && i < suffixes.length - 1) {
    num /= 1000;
    i++;
  }

  return `${num.toFixed(1).replace(/\.0$/, '')}${suffixes[i]}`;
};
