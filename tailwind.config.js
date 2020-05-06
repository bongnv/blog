module.exports = {
  theme: {
    extend: {
      inset: {
        "4x": "5rem",
      },
      maxWidth: {
        outer: "1280px",
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
      },
      spacing: {
        sm: "24rem",
        ".5x": "0.5rem",
        "1x": "1rem",
        "2x": "2rem",
      },
      fontFamily: {
        body: [
          "Noto Serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        display: ["Noto Sans SC", "Roboto", "Ubuntu"],
      },
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: ["src/**/*.css", "src/**/*.jsx", "src/**/*.js", "*.js"],
  },
};
