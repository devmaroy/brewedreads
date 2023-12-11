// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { PrimeReactProvider } from "primereact/api";
import Header from "@/app/_components/layout/Header";
import Footer from "@/app/_components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sourceSerifPro = localFont({
  display: "swap",
  variable: "--font-sourceSerifPro",
  src: [
    {
      path: "../fonts/source-serif-pro/SourceSerifPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro/SourceSerifPro-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro/SourceSerifPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Brewed Reads | Coffee Book Library",
  description:
    "Your place for finding a nice book while drinking a cup of coffee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col font-sans ${poppins.variable} ${sourceSerifPro.variable} overflow-x-hidden bg-foreground text-white`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <PrimeReactProvider>
            <Header />
            {children}
            <Footer />
          </PrimeReactProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
