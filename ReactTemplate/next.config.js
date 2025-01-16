// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     browsersListForSwc: true,
//   },
//   swcMinify: false,
// }

// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };


const withTM = require('next-transpile-modules')(['@reduxjs/toolkit']);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
