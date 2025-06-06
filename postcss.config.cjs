module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 3,
      features: {
        "custom-properties": true,
        "nesting-rules": true,
      },
    }),
  ],
};
