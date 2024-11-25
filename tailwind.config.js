import { colors } from "./assets/style/colors"

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors,
      },
    },
    plugins: [],
  }