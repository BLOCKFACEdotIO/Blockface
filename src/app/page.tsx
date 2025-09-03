"use client";
import BuyBlockComp from "@/components/common/BuyBlockComp";
import CreatePostCompo from "@/components/common/CreatePostCompo";
import Header from "@/components/common/home/Header";
import PostCard from "@/components/common/home/PostCard";
import TokenLaunchedModal from "@/components/common/TokenLaunchedModal";
import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
import SideBarTriggerButton from "@/components/layout/sidebar/trigger-btn";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const { allPost, user } = useAuth();
  const [isTokenLaunch, setIsTokenLaunch] = useState<boolean>(true);
  return (
    <div>
      <SidebarProvider>
        <div className="flex lg:flex-row flex-col min-h-screen w-full">
          <LeftSidebar />
          <SideBarTriggerButton />
          <div className="flex flex-col w-full overflow-y-auto">
            <BuyBlockComp />
            {user?.id && <CreatePostCompo />}
            <Header />
            <PostCard allPost={allPost} />
          </div>
          <RightSidebar />
        </div>
      </SidebarProvider>
      <TokenLaunchedModal
        open={isTokenLaunch}
        onClose={() => setIsTokenLaunch(false)}
      />
      <Analytics />
    </div>
  );
}
