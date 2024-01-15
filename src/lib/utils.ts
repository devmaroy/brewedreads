import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, formatString = "MMMM d, yyyy"): string {
  return format(parseISO(date.toISOString()), formatString);
}
