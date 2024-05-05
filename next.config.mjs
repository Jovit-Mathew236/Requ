/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com"],
  },
  //   async headers() {
  //     return [
  //       {
  //         source: "/(.*)",
  //         headers: [
  //           {
  //             key: "X-Frame-Options",
  //             value: "DENY",
  //           },
  //         ],
  //       },
  //     ];
  //   },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
