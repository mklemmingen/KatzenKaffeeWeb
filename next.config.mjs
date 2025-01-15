import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

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
    webpack(config, { isServer }) {
        // Disable CSS minification for client-side builds
        if (!isServer) {
            config.optimization.minimize = false;
        }

        // CSS handling with custom loaders
        config.module.rules.push({
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                postcssPresetEnv({ stage: 3 }),
                                cssnano({ preset: 'default' }),
                            ],
                        },
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
