import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import Label from "./label";
import Input from "./input";
import { Coins } from "lucide-react";
import FillButton from "./FillButton";
import BuyTokenBtn from "./buy-token-btn";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import {
    useAppKitConnection,
    type Provider,
} from "@reown/appkit-adapter-solana/react";
import toast from "react-hot-toast";

const TOKEN_MINT = new PublicKey(
    "9JJdWb2y4K1V1aHZJeZdiyScfHWGW3cLF1XNGDd2pkin"
);

export default function BlockSendModal({
    open,
    onClose,
    post,
}: {
    open: boolean;
    onClose: () => void;
    post: any;
}) {
    const { isConnected } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    const [blockBalance, setBlockBalance] = useState<number>(0);
    const [amount, setAmount] = useState<number>(10);
    const staticAmount = [10, 25, 50, 100];

    const handleSendToken = async () => {
        if (!walletProvider?.publicKey) {
            toast.error("Wallet not connected.");
            return;
        }
        try {
            const recipient = new PublicKey(post.userInfo.wallet_address);
            const sender = walletProvider.publicKey;
            const senderTokenAddress = await getAssociatedTokenAddress(
                TOKEN_MINT,
                sender
            );
            const recipientTokenAddress = await getAssociatedTokenAddress(
                TOKEN_MINT,
                recipient
            );
            const tx = new Transaction();
            const recipientAccountInfo = await connection?.getAccountInfo(
                recipientTokenAddress
            );
            if (!recipientAccountInfo) {
                tx.add(
                    createAssociatedTokenAccountInstruction(
                        sender,
                        recipientTokenAddress,
                        recipient,
                        TOKEN_MINT
                    )
                );
            }
            tx.add(
                createTransferInstruction(
                    senderTokenAddress,
                    recipientTokenAddress,
                    sender,
                    BigInt(amount) * BigInt(1_000_000)
                )
            );
            tx.feePayer = sender;
            if (!connection) {
                toast.error("No Solana connection available.");
                return;
            }
            const { blockhash } = await connection.getLatestBlockhash("finalized");
            tx.recentBlockhash = blockhash;

            const signedTx = await walletProvider.signTransaction(tx);
            await connection.sendRawTransaction(signedTx.serialize());

            toast.success(`Successfully sent ${amount} $BLOCK`);
            getBlockBalance();
            onClose();
        } catch (error: any) {
            toast.error(`Transfer failed: ${error.message || error}`);
        }
    };

    const getBlockBalance = async () => {
        if (!walletProvider?.publicKey || !connection) {
            toast.error("Wallet not connected or no connection.");
            return;
        }
        try {
            const userTokenAddress = await getAssociatedTokenAddress(
                TOKEN_MINT,
                walletProvider?.publicKey
            );
            const tokenAccountInfo = await connection.getTokenAccountBalance(
                userTokenAddress
            );
            const balance = tokenAccountInfo?.value?.uiAmount || 0;
            setBlockBalance(balance);
            return balance;
        } catch (error: any) {
            toast.error("Failed to get BLOCK balance.");
            return 0;
        }
    };

    useEffect(() => {
        if (isConnected) {
            getBlockBalance();
        }
    }, [isConnected]);

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
            }}
            className="dark:bg-[#1d1c34] w-full max-w-2xl"
        >
            <div className="font-bold dark:text-[#DDE5EE] text-xl text-center flex items-center gap-2">
                <Coins />
                Tip $Block to CryptoTrader
            </div>
            <div className="dark:text-[#DDE5EE] text-base text-center flex items-center">
                Show your appreciation for this post by sneding a tip.
            </div>
            <Label className="flex-col items-start block">
                Amount to Tip
                <Input
                    placeholder="Current Password"
                    className="mt-1"
                    type="number"
                    value={amount}
                    min={10}
                    onChange={({ target }) => setAmount(Number(target.value))}
                />
            </Label>

            <div className="flex items-center justify-center gap-2">
                {staticAmount.map((item, idx) => (
                    <button
                        key={idx}
                        className="p-2 rounded-md border border-[#32bd91] bg-[#15293A] cursor-pointer"
                        onClick={() => setAmount(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="flex items-center justify-center mt-2">
                <div>
                    Your current balance:{" "}
                    <span className="p-2 rounded-md border border-[#32bd91] bg-[#15293A]">
                        {blockBalance} $Block
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-2">
                <BuyTokenBtn onClick={onClose}>Cancel</BuyTokenBtn>
                <FillButton onClick={handleSendToken}>
                    {`Tip ${amount} $BLOCK`}
                </FillButton>
            </div>
        </Modal>
    );
}
