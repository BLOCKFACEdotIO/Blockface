import React from "react";
import FillButton from "../FillButton";
import SocialHandle from "../SocialHandle";
import Roadmap from "../Roadmap";
import Link from "next/link";

export default function Leaderboard2() {
  return (
    <div className="w-full px-4 py-4">
      <div className="flex flex-col justify-center items-center">
        <div className="font-extrabold text-4xl my-10">BLOCKFACE</div>
        <div className="font-extrabold text-lg text-center text-[#32BD91] drop-shadow-[0px_0px_5.4px_rgba(50,189,145,1)]">
          Join now and take control of your social world
        </div>
        <div className="font-extrabold text-lg text-center text-[#32BD91] drop-shadow-[0px_0px_5.4px_rgba(50,189,145,1)]">
          Powered by blockchain, built for you.
        </div>

        <div className="flex flex-col justify-center items-center mt-8 gap-5">
          <FillButton className="pump-glow">
            <Link
              href={"https://pumpkin.fun/token/68813faf054436510eb4a514"}
              target="_blank"
            >
              BUY $BLOCK
            </Link>
          </FillButton>
          <SocialHandle />
        </div>
      </div>
      <div className="mt-10">
        <Roadmap />
      </div>
    </div>
  );
}
