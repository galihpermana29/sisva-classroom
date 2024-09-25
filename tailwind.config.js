/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1030px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#F96756",
        primary_hover: "#fb7c6e",
        button_disabled: "#eaeaea",
        button_text_disabled: "#a0a0a0",
        light_red_base: "#E92C2C",

        secondary10: "#FEECE9",
        secondary20: "#FDD9D4",
        secondary50: "#F96756",
        secondary70: "#C63423",

        base10: "#F9FAFB",
        base90: "#1D2939",
        text_description: "#555555",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "16px",
          lg: "250px",
        },
      },
      boxShadow: {
        card: "0px 1px 12px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
