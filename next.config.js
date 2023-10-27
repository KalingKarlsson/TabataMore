/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
