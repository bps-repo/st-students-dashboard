/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: "#0062BC",
      secondary: "#F9F9F9",
      accent: "#118DF0",
      danger: "#E94560",
      warning: "#FF8846",
      orange: "#FF8846",
      success: "#15741F",
      dark_blue: "#00396D",
      dark_pink: "#FF3364",
      info: "#2D9CDB",
      light: "#FFFFFF",
      dark: "#212121",
      background: "#DFDFDF",
      lesson: "#00396D",
    },
    textColor: {
      primary: "#004182",
      secondary: "#B3B8C0",
      accent: "#FFC0CB",
      danger: "#E94560",
      warning: "#FF8846",
      orange: "#FF8846",
      success: "#58C18E",
      info: "#2D9CDB",
      light: "#F0F0F0",
      dark: "#212121",
      background: "#DFDFDF",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "Arial", "sans-serif"],
      serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      mono: [
        "ui-monospace",
        "SF Mono",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      heading: ["ui-sans-serif", "Arial", "sans-serif"],
      body: ["ui-sans-serif", "Arial", "sans-serif"],
      bodySmall: ["ui-sans-serif", "Arial", "sans-serif"],
      headingSmall: ["ui-sans-serif", "Arial", "sans-serif"],
      headingLarge: ["ui-sans-serif", "Arial", "sans-serif"],
      headingXLarge: ["ui-sans-serif", "Arial", "sans-serif"],
    },
    maxWidth: {},
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
            div: {
              fontFamily: -"-var(heading)",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
