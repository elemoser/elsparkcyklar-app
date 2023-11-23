import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			includePaths: ['./src/lib/styles'],
			prependData: `@import 'main.scss';`,
		},
	}),
	kit: {
		// The default "adapter-auto" only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// For this project the static adapter was chosen, which will prerender the entire site as a collection of static files.
		// To prerender only some pages and dynamically server-render others, we can use prerender option
		// https://kit.svelte.dev/docs/page-options#prerender.

		adapter: adapter({
			// Default options
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
