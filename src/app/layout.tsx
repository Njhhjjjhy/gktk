import type { Metadata } from "next";
import { Noto_Sans_JP, REM } from "next/font/google";
import QALoader from "@/components/QALoader";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const rem = REM({
  variable: "--font-rem",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "GKTK — Semiconductor Housing for Kumamoto",
  description:
    "An integrated accommodation and support platform for the semiconductor supply chain, purpose-built for Singapore-based family offices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSansJP.variable} ${rem.variable}`}>
      <body>
          {children}
          <QALoader />
        </body>
    </html>
  );
}
