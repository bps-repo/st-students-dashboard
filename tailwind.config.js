/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: "#5807b8",
      secondary: "#F9F9F9",
      accent: "#FFC0CB",
      danger: "#E94560",
      warning: "#FFB90F",
      success: "#58C18E",
      info: "#2D9CDB",
      light: "#FFFFFF",
      dark: "#212121",
      background: "#FFFF",
    },
    textColor: {
      primary: "#B3B8C0",
      secondary: "#5807B8",
      accent: "#FFC0CB",
      danger: "#E94560",
      warning: "#FFB90F",
      success: "#58C18E",
      info: "#2D9CDB",
      light: "#FFFFFF",
      dark: "#212121",
      background: "#FFFF",
    },
    fontFamily: {
      sans: ["Poppins", "Arial", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "4rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      maxWidth: {
        "3xl": "120rem",
      },
      spacing: {
        96: "24rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #5807b8, #E7428C)",
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#E7428C",
              "&:hover": {
                color: "#FFC0CB",
              },
            },
            h1: {
              fontSize: "4xl",
              fontWeight: "bold",
              letterSpacing: "-0.025em",
              lineHeight: "1.1",
            },
            h2: {
              fontSize: "3xl",
              fontWeight: "bold",
              letterSpacing: "-0.025em",
              lineHeight: "1.1",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
