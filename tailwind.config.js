/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      // Primary palette - Based on #312783 (deep indigo)
      "primary": {
        50: "#eae9f3",
        100: "#d5d3e7",
        200: "#aba7cf",
        300: "#817bb7",
        400: "#574f9f",
        500: "#312783", // Primary brand color
        600: "#2a2170",
        700: "#231b5d",
        800: "#1c164a",
        900: "#151037",
      },
      // Secondary palette - Based on #BE1622 (bright red)
      "secondary": {
        50: "#fbe7e8",
        100: "#f7cfd1",
        200: "#ef9fa3",
        300: "#e76f75",
        400: "#df3f47",
        500: "#BE1622", // Secondary brand color
        600: "#a8131e",
        700: "#8c1019",
        800: "#700d14",
        900: "#54090f",
      },
      // Accent palette - Based on #0056B3 (medium blue)
      "accent": {
        50: "#e6eef8",
        100: "#ccdef1",
        200: "#99bde3",
        300: "#669cd5",
        400: "#337bc7",
        500: "#0056B3", // Accent brand color
        600: "#004c9e",
        700: "#003f84",
        800: "#00336a",
        900: "#002650",
      },
      // Neutral palette
      "neutral": {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      // Semantic colors
      "success": {
        100: "#dcf5e7",
        300: "#8fdcb6",
        500: "#38b27b", // Main success color
        700: "#2a8c5f",
        900: "#1c5c3f",
      },
      "warning": {
        100: "#fff2e5",
        300: "#ffd0a1",
        500: "#ff9f43", // Main warning color
        700: "#e67e22",
        900: "#b35c00",
      },
      "error": {
        100: "#fee2e2",
        300: "#fca5a5",
        500: "#ef4444", // Main error color
        700: "#b91c1c",
        900: "#7f1d1d",
      },
      "info": {
        100: "#e0f2fe",
        300: "#7dd3fc",
        500: "#0ea5e9", // Main info color
        700: "#0369a1",
        900: "#0c4a6e",
      },
      // Essential colors
      "white": "#ffffff",
      "black": "#000000",
      "transparent": "transparent",

      // Background colors
      "background": {
        light: "#f9fafb",
        default: "#f3f4f6",
        dark: "#e5e7eb",
      },
    },
    fontFamily: {
      // Modern system font stack for better performance and aesthetics
      "sans": [
        "Poppins",
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      "serif": [
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      "mono": [
        "JetBrains Mono",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      // Semantic font families
      "heading": [
        "Poppins",
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      "body": [
        "Poppins",
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    fontSize: {
      // More refined type scale with better progression
      "xs": ["0.75rem", { lineHeight: "1rem" }],
      "sm": ["0.875rem", { lineHeight: "1.25rem" }],
      "base": ["1rem", { lineHeight: "1.5rem" }],
      "lg": ["1.125rem", { lineHeight: "1.75rem" }],
      "xl": ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    extend: {
      maxWidth: {
        "3xl": "120rem",
      },
      spacing: {
        "96": "24rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, var(--tw-color-primary-700), var(--tw-color-primary-500))",
        "gradient-secondary": "linear-gradient(to right, var(--tw-color-secondary-700), var(--tw-color-secondary-500))",
        "gradient-accent": "linear-gradient(to right, var(--tw-color-accent-700), var(--tw-color-accent-500))",
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "var(--tw-color-accent-500)",
              "&:hover": {
                color: "var(--tw-color-accent-700)",
              },
            },
            h1: {
              fontSize: "2.25rem",
              fontWeight: "700",
              letterSpacing: "-0.025em",
              lineHeight: "1.2",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "700",
              letterSpacing: "-0.025em",
              lineHeight: "1.3",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              letterSpacing: "-0.025em",
              lineHeight: "1.4",
            },
            h4: {
              fontSize: "1.25rem",
              fontWeight: "600",
              letterSpacing: "-0.025em",
              lineHeight: "1.4",
            },
            div: {
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "var(--tw-color-neutral-800)",
            },
          },
        },
      },
      // Add box shadows
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "DEFAULT": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "none": "none",
      },
      // Add border radius
      borderRadius: {
        "none": "0",
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },
    },
  },
  plugins: [],
};
