
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hilton: {
          blue: "#104C97",
          violet: "#4B286D",
          grey: "#F0F0F0",
          text: "#1F2937",
          background: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}
