/* eslint-disable tailwindcss/no-custom-classname */
import "./globals.scss";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import PrelineScript from "@/components/app/PrelineScript";
import { BaseLayout } from "@/components/layouts";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Home Link Farm",
  description:
    "Simplify your life with our network of trusted service providers. Repairs and household tasks From DIY to organizing a move, we offer you quality services at the best price.",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body
        className={cn(
          `${inter.className} scroll-smooth min-h-screen flex dark:bg-[#0F172A] flex-col overflow-x-hidden`,
          inter.variable
        )}
      >
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <Script strategy="lazyOnload" id="google-analytic-script">
            {` window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
          </Script>

          <BaseLayout>{children}</BaseLayout>
          <Analytics />
        </>
      </body>
      <PrelineScript />
    </html>
  );
}
