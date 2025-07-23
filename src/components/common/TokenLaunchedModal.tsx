import React from "react";
import BuyTokenBtn from "./buy-token-btn";
import { BuyTokenIcon } from "../svg/buy-token";
import { Modal } from "./modal";

export default function TokenLaunchedModal({ open, onClose }: any) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`dark:bg-[#1d1c34] w-full px-4 max-w-[768px]`}
    >
      <div className="flex flex-col items-center gap-4 justify-center py-8">
        <div className="dark:text-white text-black text-xl mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          Beta is closed. Token is launched
        </div>
        <BuyTokenBtn clasName="min-w-fit">
          <BuyTokenIcon /> Buy $BLOCK
        </BuyTokenBtn>
      </div>
    </Modal>
  );
}
