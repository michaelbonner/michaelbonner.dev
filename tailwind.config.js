module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Newsreader", "serif"],
    },
    extend: {},
  },
  variants: {
    extend: {
      mixBlendMode: ["hover"],
    },
  },
  plugins: [],
};
