import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import withPlugins from 'next-compose-plugins';
import { env } from './env.mjs';

const isProduction = process.env.NODE_ENV === 'production';
const isSentryEnabled = isProduction && process.env.SENTRY_DSN;
const sentryConfig = isSentryEnabled && {
	sentry: {
		// For all available options, see: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Transpiles SDK to be compatible with IE11 (increases bundle size)
		transpileClientSDK: true,

		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
		tunnelRoute: '/monitoring',

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true
	}
};
/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
	reactStrictMode: true,
	experimental: { instrumentationHook: true },
	rewrites() {
		return [
			{ source: '/healthz', destination: '/api/health' },
			{ source: '/api/healthz', destination: '/api/health' },
			{ source: '/health', destination: '/api/health' },
			{ source: '/ping', destination: '/api/health' }
		];
	}, // Optional build-time configuration options
	...sentryConfig
});

// Injected content via Sentry wizard below

const sentryWebpackPluginOptions = {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,

	// An auth token is required for uploading source maps.
	authToken: process.env.SENTRY_AUTH_TOKEN,

	silent: true, // Suppresses all logs

	dryRun: process.env.NODE_ENV !== 'production'

	// Additional config options for the Sentry Webpack plugin.
	// Keep in mind that https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting
export default isSentryEnabled ? withSentryConfig(config, sentryWebpackPluginOptions) : config;
