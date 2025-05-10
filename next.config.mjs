/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		domains: ["media.istockphoto.com"],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
