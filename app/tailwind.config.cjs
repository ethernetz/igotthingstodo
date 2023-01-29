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
				checkbox_checked: 'url("/checkbox_checked.svg")',
				checkbox_unchecked: 'url("/checkbox_unchecked.svg")'
			},
			screens: {
				hoverable: { raw: '(hover: hover)' }
			}
		},
		...colors
	},
	plugins: []
};
