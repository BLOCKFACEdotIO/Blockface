import Link from "next/link";
import React from "react";

export default function BuyBlockComp() {
  return (
    <div className="flex w-full items-center justify-center gap-4 py-2 cursor-pointer lg:hidden">
      <div className="text-sm text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00]">
        ~$0.01221
      </div>
      <div className="text-sm dark:text-[#a3adb9] text-[#000] dark:hover:text-white">
        <Link
          href={"https://pumpkin.fun/token/68813faf054436510eb4a514"}
          target="_blank"
        >
          Buy $Block
        </Link>
      </div>
    </div>
  );
}
