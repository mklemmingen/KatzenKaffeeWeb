/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media1.tenor.com',
            },
            {
                protocol: 'https',
                hostname: 'directory.doabooks.org',
            },
            {
                protocol: 'https',
                hostname: 'rawznaturalpetfood.com',
            },
        ],
    },
};

export default nextConfig;
