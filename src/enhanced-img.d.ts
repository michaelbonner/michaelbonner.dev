/*
 * An imported `?enhanced` image only gets 1x and 2x of the source file's own
 * width, and ignores `sizes`, so a large photo reaches a phone at 1000+ px for a
 * ~640 px slot. Images that render wide take this explicit width ladder
 * instead. The declaration has to spell out the exact suffix; keep it in sync
 * with the imports that use it.
 */
declare module '*?enhanced&w=1600;1200;960;720;480' {
	const value: import('@sveltejs/enhanced-img').Picture;
	export default value;
}
