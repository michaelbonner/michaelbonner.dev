import { classNames } from "./classNames";

export const classes = {
  menuItem: classNames(
    "text-xl border-b-2 border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1",
    "dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100"
  ),
  largeBodyLink: classNames(
    "flex gap-x-1 items-center inline text-lg border-b-2 border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1",
    "dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100"
  ),
  bodyLink: classNames(
    "border-b border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1 break-all no-underline",
    "dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100"
  ),
};
