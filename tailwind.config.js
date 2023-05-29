/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        modal: "rgba(91, 112, 131, 0.4)",
        header: "rgba(0, 0, 0, 0.65)",
      },
      colors: {
        "app-gray": "#71767B",
        "app-gray-dark": "#16181C",
      },
      boxShadow:{
        "gray":" rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px"
      }
    },
  },
  plugins: [],
};
