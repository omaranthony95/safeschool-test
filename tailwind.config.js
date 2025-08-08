import daisyui from "daisyui";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};