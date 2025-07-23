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
          Access Limited — Beta Closed 🚧
        </div>
        <div className="text-center text-base opacity-60">
          Thanks for stopping by during our Token Launch hype! We are currently
          not accepting new signups while onboarding is paused.
        </div>
        <div>
          <div className="text-center text-base">
            This is just the beginning.
          </div>
          <div className="text-center text-base">
            Get a front row seat while the future of socialunfolds.
          </div>
        </div>
      </div>
    </Modal>
  );
}
