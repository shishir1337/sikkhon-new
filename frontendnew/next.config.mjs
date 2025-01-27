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
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                port: '',
                pathname: '/public/**',
            },
        ]
    }
};

export default nextConfig;
