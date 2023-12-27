import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const josefineSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simon & Kayla",
  description: "Simon and Kayla are getting married!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={josefineSans.className + " bg-kaylasCoolColor"}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
