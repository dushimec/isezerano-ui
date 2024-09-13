// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#3d5af1',
      },
      backdropBlur: {
        'custom': '234px', // Add custom blur value
      },
    },
  },
  plugins: [],
};
