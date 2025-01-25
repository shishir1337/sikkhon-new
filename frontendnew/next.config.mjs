/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.dizishore.com',
                port: '',
                pathname: '/sikkhon.com/**',
            },
        ]
    }
};

export default nextConfig;
