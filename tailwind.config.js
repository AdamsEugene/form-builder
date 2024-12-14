/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand colors (purple theme from image)
        brand: {
          primary: "#f2e6ff", // Light purple background
          accent: "#FFB800", // Yellow/gold accent
        },
        // Updated color scheme
        primary: {
          50: "#f9f5ff",
          100: "#f2e6ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        // Light mode specific colors
        light: {
          background: "#ffffff",
          surface: "#f8fafc",
          primary: "#9333ea",
          secondary: "#64748b",
          accent: "#FFB800",
        },
        // Dark mode specific colors
        dark: {
          background: "#1e1e2d",
          surface: "#2a2a3c",
          primary: "#9333ea",
          secondary: "#94a3b8",
          accent: "#FFB800",
        },
        // Revenue gradient colors
        revenue: {
          start: "#9333ea", // Purple
          end: "#FFB800", // Gold
        },

        // Light mode specific colors
        light: {
          background: "#ffffff",
          surface: "#f8fafc",
          primary: "#0ea5e9",
          secondary: "#64748b",
          accent: "#6d28d9",
        },
        // Semantic colors
        success: {
          light: "#22c55e",
          dark: "#15803d",
        },
        warning: {
          light: "#f59e0b",
          dark: "#b45309",
        },
        error: {
          light: "#ef4444",
          dark: "#b91c1c",
        },
      },
      // Custom spacing for form elements
      spacing: {
        form: {
          input: "0.75rem",
          gap: "1rem",
          section: "2rem",
        },
      },
      // Custom border radius
      borderRadius: {
        form: "0.5rem",
        button: "0.375rem",
      },
      // Typography scale
      fontSize: {
        "form-label": ["0.875rem", "1.25rem"],
        "form-input": ["1rem", "1.5rem"],
        "form-helper": ["0.75rem", "1rem"],
      },
      // Box shadows
      boxShadow: {
        form: "0 2px 4px 0 rgb(0 0 0 / 0.05)",
        "form-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        "form-focus": "0 0 0 2px rgb(14 165 233 / 0.2)",
      },
      // Animation durations
      animation: {
        "form-enter": "formEnter 0.2s ease-out",
        "form-exit": "formExit 0.15s ease-in",
      },
      keyframes: {
        formEnter: {
          "0%": { opacity: "0", transform: "translateY(-0.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        formExit: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(0.25rem)" },
        },
      },
      backgroundImage: {
        "sidebar-gradient": "linear-gradient(180deg, #F6EFFF 0%, #F0E5FF 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    // Custom plugin for form-specific utilities
    function ({ addUtilities }) {
      addUtilities({
        ".form-input-base": {
          "@apply w-full rounded-form px-3 py-2 border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-dark-surface dark:text-white":
            {},
        },
        ".form-label-base": {
          "@apply block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1":
            {},
        },
        ".form-helper-base": {
          "@apply mt-1 text-sm text-gray-500 dark:text-gray-400": {},
        },
      });
    },
  ],
};
