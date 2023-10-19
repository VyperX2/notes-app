/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#121212",
				secondary: "#212121",
			},
			fontFamily: {
				Outfit: ["Outfit", "sans-serif"],
				Chivo: ["Chivo", "sans-serif"],
				Roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};
