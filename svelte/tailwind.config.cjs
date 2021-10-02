const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#fffcf6',
					'100': '#fef9ed',
					'200': '#fdefd3',
					'300': '#fbe6b8',
					'400': '#f8d383',
					'500': '#f5c04e',
					'600': '#ddad46',
					'700': '#b8903b',
					'800': '#93732f',
					'900': '#785e26'
				},
				gray: {
					'50': '#f3f3f3',
					'100': '#e7e7e7',
					'200': '#c3c3c3',
					'300': '#9e9f9f',
					'400': '#565656',
					'500': '#0d0e0e',
					'600': '#0c0d0d',
					'700': '#0a0b0b',
					'800': '#080808',
					'900': '#060707'
				},
				["light-gray"]: {
					'50': '#f6f6f6',
					'100': '#ededed',
					'200': '#d3d3d3',
					'300': '#b8b8b8',
					'400': '#838283',
					'500': '#4e4d4e',
					'600': '#464546',
					'700': '#3b3a3b',
					'800': '#2f2e2f',
					'900': '#262626'
				}
			}
		}
	},
	plugins: []
};

module.exports = config;
