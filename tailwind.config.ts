import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        comeIn: {
          '0%': {
            opacity: "0",
            transform: 'translateY(-100%)'

          },
          '100%': {
            opacity: "1",
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        tasksAnimate: 'comeIn .3s ease-in',
      },
      backgroundImage: {
        bgCheck: "var(--check)",
        desktopDark: "var(--bgDesktopDark)",
        desktopLight: "var(--bgDesktopLight)",
        mobileDark: "var(--bgMobileDark)",
        mobileLight: "var(--bgMobileLight)",
      },
      colors: {
        darkBg: "var(--dark)",
        lightBg: "var(--light)",
        containerDark: "var(--containerDark)",
        containerLight: "var(--containerLight)",
        textDark: "var(--textDark)",
        textLight: "var(--textLight)",
        active: "var(--active)",
        textOpacity: "var(--text-opacity)",
      },
    },
  },
  plugins: [],
};
export default config;
