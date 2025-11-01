// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6366F1", // primary accent (indigo-like)
          light: "#8B8AFD",
          dark: "#4F46E5",
        },
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        "card-sm": "0 6px 18px rgba(2,6,23,0.4)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
