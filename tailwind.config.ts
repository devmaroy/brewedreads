import { fontFamily as defaultFontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: {
        DEFAULT: "12px",
        sm: "1rem",
        lg: "1rem",
        xl: "1rem",
        "2xl": "1rem",
      },

      // default breakpoints but with 40px removed
      screens: {
        sm: "640px", // Mobile
        md: "768px", // Tablets
        lg: "1024px", // Larger tablets/small laptops
        xl: "1120px", // Desktops (maximum size)
        "2xl": "1120px", // Very Large Screens (same as xl)
      },
    },
    extend: {
      gridTemplateColumns: {
        "fluid-fill-8-5": "repeat(auto-fill, minmax(8.5rem, 1fr))",
        "fluid-fill-11": "repeat(auto-fill, minmax(11rem, 1fr))",
        "fluid-fill-18-5": "repeat(auto-fill, minmax(18.5rem, 1fr))",
      },
      width: {
        "206p": "12.875rem",
        "233p": "14.5625rem",
        "432p": "27rem",
        "512p": "32rem",
      },
      height: {
        "30p": "1.875rem",
        "35p": "2.1875rem",
        "52p": "3.25rem",
        "824p": "51.5rem",
        "904p": "56.5rem",
      },
      spacing: {
        "1.5": "-0.375rem",
        // 8pt Design Grid System
        "8p": "0.5rem",
        "10p": "0.625rem",
        "12p": "0.75rem",
        "14p": "0.875rem",
        "16p": "1rem",
        "18p": "1.125rem",
        "20p": "1.25rem",
        "22p": "1.375rem",
        "24p": "1.5rem",
        "32p": "2rem",
        "40p": "2.5rem",
        "48p": "3rem",
        "56p": "3.5rem",
        "64p": "4rem",
        "72p": "4.5rem",
        "80p": "5rem",
        "88p": "5.5rem",
        "96p": "6rem",
        "104p": "6.5rem",
        "112p": "7rem",
        "120p": "7.5rem",
      },
      fontSize: {
        "14p": "0.875rem", // 14px
        "16p": "1rem", // 16px
        "18p": "1.125rem", // 18px
        "20p": "1.25rem", // 20px
        "22p": "1.375rem", // 22px
        "24p": "1.5rem", // 24px
        "26p": "1.625rem", // 26px
        "28p": "1.75rem", // 28px
        "30p": "1.875rem", // 30px
        "32p": "2rem", // 32px
        "34p": "2.125rem", // 34px
        "36p": "2.25rem", // 36px
        "38p": "2.375rem", // 38px
        "40p": "2.5rem", // 40px
        "42p": "2.625rem", // 42px
        "44p": "2.75rem", // 44px
        "46p": "2.875rem", // 46px
        "48p": "3rem", // 48px
        // Clamp
        "clamp-44p-to-80p": "clamp(2.75rem, 6vw, 5rem)",
        "clamp-46p-to-52p": "clamp(2.875rem, 6vw, 3.25rem)",
        "clamp-32p-to-46p": "clamp(2rem, 6vw, 2.875rem)",
        "clamp-24p-to-30p": "clamp(1.5rem, 3.2vw, 1.875rem)",
        "clamp-26p-to-40p": "clamp(1.625rem, 3.2vw, 2.5rem)",
        "clamp-20p-to-24p": "clamp(1.25rem, 3vw, 1.5rem)",
        "clamp-18p-to-20p": "clamp(1.125rem, 3vw, 1.25rem)",
        "clamp-16p-to-24p": "clamp(1rem, 3vw, 1.5rem)",
        "clamp-16p-to-18p": "clamp(1rem, 3vw, 1.125rem)",
      },
      lineHeight: {
        "1.2": "1.2", // Line height = 1.2 times the font size
        "1.4": "1.4", // Line height = 1.4 times the font size
        "1.5": "1.5", // Line height = 1.5 times the font size
        "1.6": "1.6", // Line height = 1.6 times the font size
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          off: "hsl(var(--foreground-off))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        base: {
          DEFAULT: "hsl(var(--base))",
          foreground: "hsl(var(--muted-base))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", ...defaultFontFamily.sans],
        serif: ["var(--font-sourceSerifPro)", ...defaultFontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
