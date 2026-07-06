/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The only SVGs served through next/image are our own local placeholder
    // covers in /public/covers — safe to allow since they're not
    // user-uploaded content. Swap them for real JPG/PNG covers before
    // launch and this can be removed.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
