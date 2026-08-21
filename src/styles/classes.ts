import { classNames } from '../functions/classNames';

export const classes = {
	menuItem: classNames(
		'border-ink/25 hover:text-tomato hover:border-tomato border-b font-sans outline-none',
		'focus-visible:text-tomato focus-visible:border-tomato'
	),
	largeBodyLink: classNames(
		'border-ink/25 hover:text-tomato hover:border-tomato inline-flex items-center gap-x-1 border-b font-sans outline-none',
		'focus-visible:text-tomato focus-visible:border-tomato'
	),
	bodyLink: classNames(
		'border-tomato/50 text-tomato hover:border-tomato inline-flex break-words border-b font-sans no-underline outline-none',
		'focus-visible:border-tomato'
	)
};
