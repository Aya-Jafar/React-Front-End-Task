// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this points to the correct files
    "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx}", // Include Material Tailwind components as well
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01B172", // Customize primary color
        secondary: "#FF5722", // Customize secondary color
      },
      typography: {
        heading: {
          fontFamily: "'Vazirmatn'", // Customize heading font family
          fontWeight: "600",
        },
        body: {
          fontFamily: "'Vazirmatn'", // Customize body font family
        },
      },
    },
  },
  plugins: [],
});
