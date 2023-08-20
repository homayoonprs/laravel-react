/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/ts/**/*.{js,jsx,ts,tsx}",

    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#0069A0',
                secondary: '#FDB815',
                success: '#00B74A',
                danger: '#F93154',
                dark: '#161C24',
                darkSecondary: '#212B36',
                titanium: '#6D6E71'
            },
            screens: {
                'xs': '576px',
            },
        },
    },
    plugins: [],
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark']
        }
    }
    ,
    corePlugins: {
        preflight: false,
    }
}
