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
        accent: {
          50: "#eef8ff",
          100: "#d9efff",
          500: "#1687c9",
          600: "#0e6fa8",
          700: "#0d5987",
        },
      },
      boxShadow: {
        soft: "0 12px 35px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
