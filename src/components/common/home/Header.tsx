"use client";
import { Gem, Globe, RefreshCcw, Users, Wifi } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
  const [active, setActive] = useState<string>("forYou");
  return (
    <div>
      <div className="border-b flex items-center gap-4 justify-center py-1.5">
        <div
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            active === "forYou"
              ? "text-[#000000] dark:text-[#DDE5EE]"
              : "text-[#999999] dark:text-[#8C9FB7A0]"
          }`}
          onClick={() => setActive("forYou")}
        >
          <Globe size={14} />
          For You
        </div>
        <div
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            active === "following"
              ? "text-[#000000] dark:text-[#DDE5EE]"
              : "text-[#999999] dark:text-[#8C9FB7A0]"
          }`}
          onClick={() => setActive("following")}
        >
          <Users size={16} />
          Following
        </div>
        {/* <div
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            active === "launchpad"
              ? "text-[#000000] dark:text-[#DDE5EE]"
              : "text-[#999999] dark:text-[#8C9FB7A0]"
          }`}
          onClick={() => setActive("launchpad")}
        >
          <Gem size={16} />
          Launchpad
        </div> */}
      </div>
      <div className="border-b flex items-center gap-4 justify-between p-2">
        <div className="flex gap-2 text-[#000000] dark:text-[#DDE5EE] text-xs">
          <span className="flex gap-1 items-center text-[#000000] dark:text-[#DDE5EE] hover:underline cursor-pointer">
            <Wifi className="rotate-45" size={18} />
            Block For You Free
          </span>
          by $BLOCK
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-[#F1F1F1] dark:hover:bg-[#13151A] px-4 py-1 border border-[#dadada] text-xs dark:text-[#A3AdA9] dark:hover:text-[#DDE5EE] text-[#000000] rounded-full">
          <RefreshCcw size={12} />
          Update
        </div>
      </div>
    </div>
  );
}
