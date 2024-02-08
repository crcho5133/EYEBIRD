// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "maplestory-bold": ["MaplestoryOTFBold", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
