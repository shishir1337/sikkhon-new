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
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },
            {
                protocol: 'https',
                hostname: 'cms.sikkhon.com',
                port: '',
                pathname: '/sikkhon/**',
            },
            {
                protocol: "https",
                hostname: "cms.sikkhon.com",
                port: "",
                pathname: "/api/media/file/**", // Allows all images under this path
            },
            {
                protocol: "https",
                hostname: "media.dizishore.com",
            },

        ]
    }
};

export default nextConfig;
