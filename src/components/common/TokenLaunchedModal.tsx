import React from "react";
import { Modal } from "./modal";

export default function TokenLaunchedModal({ open, onClose }: any) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`dark:bg-[#1d1c34] w-full px-4 max-w-[500px]`}
    >
      <div className="flex flex-col items-center gap-4 justify-center py-4">
        <div className="font-bold text-2xl">Blockface</div>
        <div className="font-bold text-xl text-center">
          Welcome — Beta 1 Extended 🚀
        </div>
        <div className="text-center text-base opacity-60">
          Thanks for joining us during the extended launch of Beta 1! We're building Beta 2 — so take this time to explore and get a feel for what Blockface is all about.
        </div>
      </div>
    </Modal>
  );
}
