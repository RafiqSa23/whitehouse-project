import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/AuthContexts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "White House Premier 6",
    template: "%s | White House Premier 6",
  },
  description:
    "White House Premier adalah hunian eksklusif yang menawarkan kenyamanan modern, desain elegan, dan lokasi strategis untuk gaya hidup premium",
  keywords: [
    "rumah",
    "hunian",
    "properti",
    "white house premiere",
    "perumahan",
  ],
  authors: [{ name: "White House Premier" }],
  metadataBase: new URL("https://whitehousepremier6.com"),
  openGraph: {
    title: "White House Premiere - Hunian Nyaman & Strategis",
    description:
      "Temukan rumah impian Anda dengan fasilitas lengkap dan lokasi strategis",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
