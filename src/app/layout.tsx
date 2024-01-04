import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

const josefineSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simon & Kayla",
  description: "Simon and Kayla are getting married!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <body className={josefineSans.className + " bg-kaylasCoolColor"}>
          <SpeedInsights />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
