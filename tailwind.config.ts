import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette sampled from the KIP logo: near-black ink, pure
        // white ground, and the logo's two reds.
        ink: {
          DEFAULT: "#101010",
          soft: "#1C1C1C",
        },
        red: {
          DEFAULT: "#C40009", // wordmark red — 6.5:1 on white
          bright: "#E8000D", // icon-tile red — small accents only
          dark: "#9B0007",
        },
        haze: "#F5F5F5", // neutral secondary surface (chroma 0)
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
