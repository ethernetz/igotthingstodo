const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				barlow: ['Barlow Condensed', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial-at-bottom': 'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))'
			},
			content: {
				fire: 'url("src/lib/assets/fire.svg")',
				checkbox_checked: 'url("src/lib/assets/checkbox_checked.svg")',
				checkbox_unchecked: 'url("src/lib/assets/checkbox_unchecked.svg")'
			}
		},
		...colors
	},
	plugins: []
};
