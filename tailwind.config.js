/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#293241",
        primaryLight: "#3d5a80",
        secondaryDark: "#98c1d9",
        secondaryLight: "#e0fbfc",
        contrast: "#ee6c4d",
      },
    },
  },
  plugins: [],
};
