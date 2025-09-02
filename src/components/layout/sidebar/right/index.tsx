import InputWithIcons from "@/components/common/input-with-icons";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import React from "react";
import Market from "./market";
import TopTokens from "./top-tokens";
import AdBanner from "@/components/Ads/AdBanner";
import Script from "next/script";

export default function RightSidebar() {
  return (
    <Sidebar
      side="right"
      className="hidden max-w-[280px] justify-start border-l lg:flex dark:bg-[#1d1c34] bg-[#FFFFFF] h-screen overflow-y-auto slim-scrollbar sticky top-0"
    >
      <p className="text-[12px] opacity-[0.7] mt-1 ml-1">Advertisement</p>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3742696288532239"
        crossOrigin="anonymous"
      />
      <AdBanner />
      <Script id="adsbygoogle-push" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
      {/* <SidebarContent className="dark:bg-[#1d1c34] bg-[#FFFFFF]">
        <div>
          <div className="p-4">
            <InputWithIcons
              placeholder="Search..."
              endIcon={<Search size={16} />}
            />
          </div>
          <Market />
          <TopTokens />
        </div>
      </SidebarContent> */}
    </Sidebar>
  );
}
