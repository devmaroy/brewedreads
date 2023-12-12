/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  importOrder: ["^components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-prisma",
    "@trivago/prettier-plugin-sort-imports",
  ],
};

export default config;
