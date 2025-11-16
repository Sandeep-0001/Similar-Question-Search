import { twMerge } from 'tailwind-merge';
import { clsx as clsxBase } from 'clsx';

export function cn(...inputs) {
  return twMerge(clsxBase(inputs));
}
