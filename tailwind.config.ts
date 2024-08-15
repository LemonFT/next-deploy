import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "text-gray-light": "#666666",
      },
      backgroundColor: {
        "brg-white-0.5": "rgba(255, 255, 255, .5)",
        "brg-green-0.5": "rgba(13, 192, 53, .7)",
      }
    },
  },
  plugins: [],
};
export default config;
