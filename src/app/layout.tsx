import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AppKitProvider } from "@/context/WalletContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Footer from "@/components/common/Footer";
import GoogleAdsense from "@/components/Ads/GoogleAdsense";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blockface",
  description: "Blockface.io",
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetBrainsMono.variable} suppressHydrationWarning`}>
        <GoogleAdsense pId="pub-3742696288532239" />
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" enableSystem={false}>
              <AppKitProvider>
                <div className="dark:bg-[#1d1c34] flex justify-center">
                  <div className="max-w-[1300px] w-full">{children}</div>
                </div>
                <Footer />
                <Toaster />
              </AppKitProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
        <Script id="ads-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </body>
    </html>
  );
}
