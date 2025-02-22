const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01B172", 
        secondary: "#FF5722",
      },
     screens: {
        'ipad': { 'min': '768px', 'max': '1024px' }, // iPad range (portrait to landscape)
      },
      typography: {
        heading: {
          fontFamily: "'Vazirmatn'", 
          fontWeight: "600",
        },
        body: {
          fontFamily: "'Vazirmatn'", 
        },
      },
    },
  },
  plugins: [],
});
