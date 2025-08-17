"use client";
import React, { useEffect, useState } from "react";
import { Activity, Upload, User } from "lucide-react";
import { SOLANA_RPC_URL, useAuth } from "@/providers/AuthProvider";
import WalletHeader from "./WalletHeader";
import BuyTokenBtn from "../buy-token-btn";
import ShareModal from "../ShareModal";
import useUrl from "@/hooks/useUrl";
import WalletBalanceCard from "./WalletBalanceCard";
import { ChartPieLegend } from "./PieChart";
import CoreAssets from "./CoreAssets";
import MainLoader from "../MainLoader";
import { useRouter } from "next/navigation";
import { TOKEN_MINT } from "../BlockSendModal";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export default function WalletComp() {
  const { user, allUsers, blockTokenDetails } = useAuth();
  const router = useRouter();
  const { host, pathname } = useUrl();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blockBalance, setBlockBalance] = useState<number>(0);

  const handleSearch = (value: string = "") => {
    setSearch(value);
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setSearch("");
  };

  const currentUser =
    selectedUser ||
    allUsers?.find(
      (item: { wallet_address: string }) =>
        String(item?.wallet_address) === String(user?.wallet_address)
    );

  const getBlockBalance = async () => {
    try {
      const connection = new Connection(SOLANA_RPC_URL, "confirmed");
      const userTokenAddress = await getAssociatedTokenAddress(
        TOKEN_MINT,
        new PublicKey(currentUser?.wallet_address)
      );
      const tokenAccountInfo = await connection?.getTokenAccountBalance(
        userTokenAddress
      );
      const balance = tokenAccountInfo?.value?.uiAmount || 0;
      setBlockBalance(balance);
      return balance;
    } catch (error: any) {
      return 0;
    }
  };

  useEffect(() => {
    getBlockBalance();
    if (currentUser?.assets) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="w-full py-2 border-r">
      <WalletHeader
        search={search}
        handleSearch={handleSearch}
        data={currentUser}
        allUsers={allUsers}
        onUserSelect={handleUserSelect}
      />
      <div className="flex items-center gap-4 p-4 border-y overflow-x-scroll hide-scrollbar">
        <BuyTokenBtn clasName="w-fit">
          <Activity /> Activity
        </BuyTokenBtn>
        <BuyTokenBtn
          clasName="w-fit"
          onClick={() => router.push(`/${user?.id}`)}
        >
          <User /> Profile
        </BuyTokenBtn>
        <BuyTokenBtn clasName="w-fit" onClick={() => setIsOpen(!isOpen)}>
          <Upload /> Share
        </BuyTokenBtn>
      </div>
      <div className="flex gap-4 max-2xl:flex-col-reverse border-b w-full justify-between">
        <div className="p-4 w-full">
          <WalletBalanceCard
            data={currentUser}
            blockBalance={blockBalance}
            tokenDetails={blockTokenDetails}
          />
        </div>
        <div className="p-4 flex justify-between gap-4 w-full max-md:flex-col">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col border p-4 rounded-lg gap-2 w-full">
              <div className="text-xs text-[#000000] dark:text-[#DDE5EE]">
                Tokens Owned
              </div>
              <div className="text-2xl text-[#000000] dark:text-[#DDE5EE]">
                {currentUser?.assets
                  ? currentUser?.assets?.coins?.length + 2
                  : 0}
              </div>
            </div>
            <div className="flex flex-col border p-4 rounded-lg gap-2 w-full">
              <div className="text-xs text-[#000000] dark:text-[#DDE5EE]">
                Total Portfolio Value
              </div>
              <div className="text-2xl text-[#000000] dark:text-[#DDE5EE]">
                $
                {currentUser?.assets
                  ? Number(
                      currentUser?.assets?.totalBalanceUSD +
                        blockTokenDetails[0]?.priceUsd * blockBalance
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : 0}
              </div>
            </div>
          </div>
          <div className="w-full">
            <ChartPieLegend data={currentUser} />
          </div>
        </div>
      </div>
      <div className="p-4">
        <CoreAssets
          data={currentUser}
          blockBalance={blockBalance}
          tokenDetails={blockTokenDetails}
        />
      </div>
      <ShareModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        referralLink={`${host}${pathname}`}
        currentPageLink={`${host}${pathname}/${user?.username}`}
        postTitle="Check out this awesome post on Block Face!"
      />
    </div>
  );
}
