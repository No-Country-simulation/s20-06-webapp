/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que Tailwind escanee todos tus archivos
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#1B1919",
        comiRed:"#E71B1E",
        comiWhite:"#FAF3FF"
      },
    },
  },
  plugins: [],
};
