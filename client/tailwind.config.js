/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary": "#ffffff", "on-primary": "#ffffff", "on-error": "#ffffff", "on-secondary": "#ffffff",
        "outline": "#A78BFA", "outline-variant": "#EDE9FE", "on-surface": "#30283a", "on-background": "#30283a",
        "surface": "#ffffff", "background": "#ffffff", "surface-bright": "#ffffff", "surface-container-lowest": "#ffffff",
        "primary": "#6D28D9", "primary-container": "#4C1D95", "primary-fixed": "#EDE9FE", "primary-fixed-dim": "#A78BFA",
        "secondary": "#A78BFA", "secondary-fixed": "#EDE9FE", "secondary-fixed-dim": "#A78BFA", "secondary-container": "#EDE9FE",
        "tertiary": "#4C1D95", "tertiary-container": "#6D28D9", "tertiary-fixed": "#EDE9FE", "tertiary-fixed-dim": "#A78BFA",
        "surface-variant": "#EDE9FE", "surface-container": "#F5F3FF", "surface-container-low": "#F5F3FF",
        "surface-container-high": "#EDE9FE", "surface-container-highest": "#EDE9FE", "surface-dim": "#EDE9FE",
        "surface-tint": "#6D28D9", "inverse-primary": "#A78BFA", "inverse-surface": "#30283a", "inverse-on-surface": "#ffffff",
        "on-surface-variant": "#766d81", "on-primary-container": "#ffffff", "on-tertiary-container": "#ffffff", "on-error-container": "#4C1D95",
        "on-primary-fixed": "#4C1D95", "on-primary-fixed-variant": "#4C1D95", "on-secondary-fixed": "#4C1D95", "on-secondary-fixed-variant": "#4C1D95",
        "on-tertiary-fixed": "#4C1D95", "on-tertiary-fixed-variant": "#4C1D95", "error": "#4C1D95", "error-container": "#EDE9FE",
        "on-secondary-container": "#4C1D95", "accent-dark": "#4C1D95", "brand-orange": "#6D28D9",
      },
      borderRadius: {
        "DEFAULT": "16px",
        "lg": "16px",
        "xl": "16px",
        "full": "9999px",
      },
      spacing: {
        "section-gap": "120px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "unit": "4px",
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "headline-xl-mobile": ["Poppins", "sans-serif"],
        "display-lg": ["Poppins", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "label-bold": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "price-display": ["Poppins", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"],
        "display": ["Poppins", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-xl-mobile": ["48px", { lineHeight: "48px", fontWeight: "400" }],
        "display-lg": ["120px", { lineHeight: "110px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "36px", fontWeight: "400" }],
        "label-bold": ["14px", { lineHeight: "20px", letterSpacing: "0.1em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "price-display": ["24px", { lineHeight: "24px", fontWeight: "700" }],
        "headline-xl": ["72px", { lineHeight: "72px", fontWeight: "400" }],
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};
