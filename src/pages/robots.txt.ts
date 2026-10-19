import type { APIRoute } from 'astro';

/**
 * Generated from `site` in astro.config.ts so the sitemap URL can never drift
 * out of sync with the canonical domain.
 */
export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('sitemap-index.xml', site);

	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${sitemap.href}`,
		''
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
