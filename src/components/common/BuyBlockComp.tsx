"use client";
import { dexRoute } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";

export default function BuyBlockComp() {
  const { blockTokenDetails } = useAuth();
  return (
    <div className="flex w-full items-center justify-center gap-4 py-2 cursor-pointer lg:hidden">
      <div className="text-sm text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00]">
        {`~$${blockTokenDetails[0]?.priceUsd}`}
      </div>
      <div className="text-sm dark:text-[#a3adb9] text-[#000] dark:hover:text-white">
        <Link href={dexRoute} target="_blank">
          Buy $Block
        </Link>
      </div>
    </div>
  );
}
