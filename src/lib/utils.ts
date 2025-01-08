import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Function to ignore unused variables and avoid eslint rule.
 * @param _variables variables to ignore
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ignore(..._variables: unknown[]) {
  /* ignore all the variables. */
}
