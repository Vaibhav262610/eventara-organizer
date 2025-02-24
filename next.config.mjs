/** @type {import('next').NextConfig} */
export default {
    productionBrowserSourceMaps: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    source: "/api/:path*",
    headers: [
        { key: "Access-Control-Allow-Origin", value: "https://eventara-organizer.vercel.app" },
    ],
};
