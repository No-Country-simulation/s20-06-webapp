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
        comiWhite:"#FAF3FF",
        comiBrown:"#342A2A",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
};
