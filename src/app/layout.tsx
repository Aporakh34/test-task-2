import type { Metadata } from "next";
import { Bebas_Neue, League_Spartan, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Artisan Kiln — Handcrafted Ceramic Tiles",
  description:
    "Order premium handcrafted ceramic tiles. Design your space with our curated collection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${robotoCondensed.variable} ${bebasNeue.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
