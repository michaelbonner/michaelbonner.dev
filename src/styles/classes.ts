import { classNames } from '../functions/classNames';

export const classes = {
	menuItem: classNames(
		'text-xl border-b-2 border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-all hover:scale-105 hover:rotate-1',
		'dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100'
	),
	largeBodyLink: classNames(
		'inline-flex gap-x-1 items-center text-lg border-b-2 border-gray-400 transition-all',
		'hover:text-blue-800 hover:border-blue-400 hover:scale-105 hover:rotate-1',
		'dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100'
	),
	bodyLink: classNames(
		'inline-flex border-b border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-all break-words no-underline',
		'hover:scale-105 hover:rotate-1',
		'dark:border-gray-500 dark:hover:text-blue-300 dark:hover:border-blue-100'
	)
};
