import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vice City News | Breaking Business, Tech, & Market Intelligence",
    template: "%s | Vice City News",
  },
  description:
    "Vice City News delivers breaking business news, financial analysis, executive strategy, and technology intelligence.",
  keywords: [
    "Vice City News",
    "business news",
    "market intelligence",
    "technology news",
    "finance",
    "stock market",
    "cryptocurrency",
    "global economy",
    "artificial intelligence",
    "executive strategy",
  ],
  authors: [{ name: "Vice City News Editorial Board", url: "/" }],
  creator: "Vice City News Media Inc.",
  publisher: "Vice City News Media Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Vice City News",
    title: "Vice City News | Breaking Business, Tech, & Market Intelligence",
    description:
      "Vice City News delivers breaking business news, financial analysis, executive strategy, and technology intelligence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Vice City News | Breaking Business & Tech Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VCNews",
    creator: "@VCNews",
    title: "Vice City News | Breaking Business, Tech, & Market Intelligence",
    description:
      "Vice City News delivers breaking business news, financial analysis, executive strategy, and technology intelligence.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
