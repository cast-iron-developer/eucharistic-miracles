import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export const colors = {
	primary: {
		default: '#0a0f0d',
		focus: '#080c0b',
		content: '#ffffff'
	},
	secondary: {
		default: '#399e5a',
		focus: '#173f24',
		content: '#ffffff'
	},
	accent: {
		default: '#c5283d',
		focus: '#4e1018',
		content: '#ffffff'
	},
	action: {
		info: '#2094f3',
		success: '#28a745',
		warning: '#ffc107',
		error: '#dc3545'
	}
};
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: colors.primary.default,
					'primary-focus': colors.primary.focus,
					'primary-content': colors.primary.content,
					secondary: colors.secondary.default,
					'secondary-focus': colors.secondary.focus,
					'secondary-content': colors.secondary.content,
					accent: colors.accent.default,
					'accent-focus': colors.accent.focus,
					'accent-content': colors.accent.content,
					neutral: '#3d4451',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#d1d5db',
					'base-content': '#1f2937',
					info: colors.action.info,
					success: colors.action.success,
					warning: colors.action.warning,
					error: colors.action.error
				}
			}
		]
	},
	plugins: [require('daisyui'), typography, containerQueries, aspectRatio],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif']
		},
		extend: {
			screens: {
				// additional media queries because I like flexibility
				'only-sm': { min: '640px', max: '767px' },
				// => @media (min-width: 640px and max-width: 767px) { ... }

				'only-md': { min: '768px', max: '1023px' },
				// => @media (min-width: 768px and max-width: 1023px) { ... }

				'only-lg': { min: '1024px', max: '1279px' },
				// => @media (min-width: 1024px and max-width: 1279px) { ... }

				'only-xl': { min: '1280px', max: '1535px' },
				// => @media (min-width: 1280px and max-width: 1535px) { ... }

				// additional media queries because I like flexibility
				'to-sm': { max: '639px' },
				// => @media (max-width: 639px) { ... }

				'to-md': { max: '767px' },
				// => @media (max-width: 767px) { ... }

				'to-lg': { max: '1023px' },
				// => @media (max-width: 1023px) { ... }

				'to-xl': { max: '1279px' },
				// => @media (max-width: 1279px) { ... }

				'to-2xl': { max: '1535px' },
				// => @media (max-width: 1535px) { ... }

				// Starting the inverse of the standard tailwind media queries bc i hate them.
				'from-sm': { min: '640px' },
				// => @media (max-width: 640px) { ... }

				'from-md': { min: '768px' },
				// => @media (max-width: 768px) { ... }

				'from-lg': { min: '1024px' },
				// => @media (max-width: 1024px) { ... }

				'from-xl': { min: '1280px' },
				// => @media (max-width: 1280px) { ... }

				'from-2xl': { min: '1536px' }
				// => @media (max-width: 1536px) { ... }
			},
			dropShadow: {
				light: '0 0 .75rem rgba(255, 255, 255, .7)',
				dark: '0 0 .75rem rgba(0, 0, 0, .7)'
			},
			boxShadow: {
				lightShadowSm: '0 1px 2px 0 rgb(255 255 255 / 0.05)',
				lightShadow: '0 1px 3px 0 rgb(255 255 255 / 0.1), 0 1px 2px -1px rgb(255 255 255 / 0.1)',
				lightShadowMd:
					'0 4px 6px -1px rgb(255 255 255 / 0.1), 0 2px 4px -2px rgb(255 255 255 / 0.1)',
				lightShadowLg:
					'0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1)',
				lightShadowXl:
					'0 20px 25px -5px rgb(255 255 255 / 0.1), 0 8px 10px -6px rgb(255 255 255 / 0.1)',
				lightShadow2xl: '0 25px 50px -12px rgb(255 255 255 / 0.25)',
				lightShadowInner: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.05)'
			},
			colors: {
				primary: {
					DEFAULT: colors.primary.default,
					100: '#020303',
					200: '#040605',
					300: '#060908',
					400: colors.primary.focus,
					500: '#0a0f0d',
					600: '#314940',
					700: '#588472',
					800: '#8bb1a2',
					900: '#c5d8d0'
				},
				secondary: {
					DEFAULT: colors.accent.default,
					100: '#27080c',
					200: colors.accent.focus,
					300: '#751824',
					400: '#9c2030',
					500: '#c5283d',
					600: '#da485c',
					700: '#e37684',
					800: '#eca4ad',
					900: '#f6d1d6'
				},
				tert: {
					DEFAULT: colors.secondary.default,
					100: '#0b1f12',
					200: colors.secondary.focus,
					300: '#225e36',
					400: '#2d7e48',
					500: '#399e5a',
					600: '#51c076',
					700: '#7dd098',
					800: '#a8e0bb',
					900: '#d4efdd'
				},
				quart: {
					DEFAULT: '#ffd700',
					100: '#332b00',
					200: '#665700',
					300: '#998200',
					400: '#ccad00',
					500: '#ffd700',
					600: '#ffe033',
					700: '#ffe866',
					800: '#fff099',
					900: '#fff7cc'
				},
				backgroundWhite: {
					DEFAULT: '#f2f4f7'
				},
				white: {
					DEFAULT: '#eee'
				},
				trueWhite: {
					DEFAULT: '#fff'
				},
				black: {
					DEFAULT: '#333'
				}
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				wiggle: 'wiggle 200ms ease-in-out'
			}
		}
	}
} satisfies Config;
