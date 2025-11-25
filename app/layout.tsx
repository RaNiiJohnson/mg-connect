import "@/lib/orpc/orpc.server"; // for pre-rendering

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Suspense } from "react";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import HeaderFallback from "@/components/headerFallback";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hallo Hallo - Communauté Malagasy en Allemagne",
  description:
    "Plateforme d'échange et de partage pour favoriser l'entraide entre les jeunes expats Malagasy en Allemagne. Emplois, logements, communauté.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main className="min-h-screen">
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
