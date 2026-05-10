import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge so we can conditionally apply
 * Tailwind classes without worrying about conflicting utilities.
 * e.g. cn('px-2 py-1', condition && 'bg-red-500', 'px-4') → 'py-1 bg-red-500 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
