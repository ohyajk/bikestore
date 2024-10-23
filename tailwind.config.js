/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#ff5e00',
                'secondary': '#fafafa',
                'prime2': '#00A1FF',
                'bg2': "#272727"
            },
        },
    },
    plugins: [require("flowbite/plugin")],
}
