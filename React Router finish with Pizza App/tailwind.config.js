/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
 sans:"Roboto Mono, monospace",
    },

    // so we can overide any default property of tailwind , like colors font theme etc, lets change height as vh to dvh as it creates probllem to mobile browsers

    extend: {
          height:{
screen: "100dvh",
    },
    },
  },
  plugins: [],
}

// extened means we are keeping original as it it as overiding some of them, like if we use fontsize in theme as 80 rem or any other value then sm, lg etc wil no longer exist
// but if we use extend then all original values will remain and our new value will be added to it