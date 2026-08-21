import { classNames } from '../functions/classNames';

/*
 * Link and surface treatments, shared across the site.
 *
 * The previous versions all leaned on a 2px bottom border plus
 * `hover:scale-105 hover:rotate-1`. The border stacked heavy rules under every
 * phrase in a paragraph, and the transform tilted text on hover, which blurred
 * it mid-animation and shifted layout. These use real underlines with an offset
 * and colour transitions instead, so nothing moves and nothing reflows.
 */

/* Underline that thickens and saturates on hover, for links in running text. */
const underline = classNames(
	'underline decoration-1 underline-offset-[3px] decoration-accent/40',
	'transition-[text-decoration-color,color] duration-150 ease-out',
	'hover:decoration-accent hover:text-accent'
);

export const classes = {
	/*
	 * Nav and footer links: no rule at rest, a copper underline that wipes in on
	 * hover. The underline is an absolutely positioned pseudo-element scaled on
	 * the x axis, so the animation is a composited transform rather than a width
	 * change that would relayout the nav on every hover.
	 */
	menuItem: classNames(
		'relative inline-block font-sans text-ui font-medium tracking-wide text-ink-muted no-underline',
		'transition-colors duration-150 ease-out hover:text-ink',
		"after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:content-['']",
		'after:origin-left after:scale-x-0 after:bg-accent-bright',
		'after:transition-transform after:duration-200 after:ease-out',
		'hover:after:scale-x-100',
		/* The current section keeps its underline without a hover. */
		'aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100'
	),

	/* Standalone links that read as an action: sized up, icon-friendly. */
	largeBodyLink: classNames('inline-flex items-center gap-x-2 text-lead', underline),

	/* Links inside a paragraph. */
	bodyLink: classNames('break-words', underline),

	/* Small sans label for metadata, table headers, form labels. */
	label: 'font-sans text-ui-sm font-medium tracking-wide text-ink-faint',

	/* Sans-serif interface text at its normal size. */
	ui: 'font-sans text-ui text-ink-muted',

	/*
	 * A raised panel. `hover` variants lift the border and shadow rather than
	 * scaling the element, so text stays crisp and the grid stays still.
	 */
	surface: 'rounded-xl border border-rule bg-surface shadow-panel',

	surfaceInteractive: classNames(
		'rounded-xl border border-rule bg-surface shadow-panel',
		'transition-[border-color,box-shadow,transform] duration-200 ease-out',
		'hover:border-rule-strong hover:shadow-lift hover:-translate-y-0.5'
	),

	/* Form controls. */
	input: classNames(
		'w-full rounded-lg border border-rule bg-surface px-3 py-2',
		'font-sans text-ui text-ink placeholder:text-ink-faint',
		'transition-colors duration-150 ease-out',
		'hover:border-rule-strong',
		'focus:border-accent-bright focus:outline-none'
	),

	button: classNames(
		'inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg',
		'bg-accent px-5 py-2.5 font-sans text-ui font-semibold text-ground',
		'transition-colors duration-150 ease-out',
		'hover:bg-accent-bright'
	),

	buttonQuiet: classNames(
		'inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg',
		'border border-rule bg-surface px-4 py-2 font-sans text-ui font-medium text-ink-muted',
		'transition-colors duration-150 ease-out',
		'hover:border-rule-strong hover:text-ink'
	),

	/* Section heading, paired with `sectionRule` for the hairline above it. */
	sectionHeading: 'font-serif text-h2 font-semibold text-ink',

	/*
	 * Eyebrow above a section heading. Caps are fine at label size; the shared
	 * rules only ban all-caps for body copy.
	 */
	eyebrow: 'font-sans text-ui-sm font-semibold tracking-[0.14em] uppercase text-accent'
};
