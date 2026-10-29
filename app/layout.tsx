import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { MotionProvider } from "@/components/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "greek"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "Computer Science graduate student at Purdue University Northwest. Research-driven software development, data systems and immersive technologies.";

export const metadata: Metadata = {
  // The live domain from the README; share-card URLs resolve against it.
  metadataBase: new URL("https://panagiotispapadopoulos.com"),
  title: "Panagiotis Papadopoulos",
  description,
  openGraph: {
    type: "profile",
    title: "Panagiotis Papadopoulos",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panagiotis Papadopoulos",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-svh overflow-x-clip">
        <div aria-hidden className="atmosphere-noise pointer-events-none fixed inset-0 z-[60]" />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-md focus:bg-raised focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        <MotionProvider>{children}</MotionProvider>

        {site.goatcounterCode && (
          <Script
            data-goatcounter={`https://${site.goatcounterCode}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
