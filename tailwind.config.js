/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS v4 uses CSS-based configuration via `@theme` in globals.css.
 * This file documents all custom design tokens (colors, fonts, radii) per ТЗ requirement
 * and provides content path configuration.
 *
 * Actual theme tokens are applied in src/app/globals.css @theme block.
 */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        /* Core palette */
        parchment: {
          DEFAULT: "#EDE0C4",
          light:   "#F5EDD8",
          dark:    "#D9CDB0",
        },

        /* Header */
        "header-bg":       "#F2EBD9",
        "header-badge":    "#C4A46D",
        "header-user-pill":"#3E4A59",

        /* Navy scale */
        navy: {
          DEFAULT: "#1A2847",
          mid:     "#2B3F6A",
          light:   "#3B5490",
        },

        /* Text */
        "color-text":      "#1A1A2E",
        "text-muted":      "#4A4A5E",

        /* Tile collection */
        tile: {
          blue:       "#2B4F8F",
          cream:      "#E8DFC4",
          terracotta: "#C47A62",
          gold:       "#E8C44A",
          fern:       "#4A8030",
        },

        "white-warm": "#FDFAF5",
        border:       "#1A2847",
      },

      fontFamily: {
        /* Mapped to CSS variables injected by next/font */
        sans:      ["var(--font-league)",          "sans-serif"],
        display:   ["var(--font-bebas)",           "sans-serif"],
        condensed: ["var(--font-roboto-condensed)","sans-serif"],
      },

      borderRadius: {
        sm: "2px",
        md: "6px",
        lg: "10px",
      },

      borderWidth: {
        DEFAULT: "3px",
      },
    },
  },

  plugins: [],
};

export default config;
