import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { defaultUserProfile, sliceMethod } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";
import DotsLoader from "./DotsLoader";

export default function UserInfoCard() {
  const { user, logout } = useAuth();

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Cpoied Successfully: ${text}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex rounded-md transition-colors border dark:border-[#2a323b7e] bg-transparent dark:text-[#a3adb9] hover:bg-[#F1F1F1] text-[#000] dark:hover:bg-[#13151a] dark:hover:text-white p-2 items-center gap-2 cursor-pointer">
            <div>
              <Avatar className="size-14">
                <AvatarImage
                  width={100}
                  height={100}
                  className="rounded-full border object-cover"
                  src={user?.avatar ?? defaultUserProfile}
                />
                <AvatarFallback>
                  <DotsLoader size="w-2 h-2" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-sm line-clamp-1">{user?.name}</h1>
              <h2 className="text-xs">@{user?.username}</h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Logged in as: {user?.name}</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCopy(user?.username)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <CopyIcon /> @{user?.username}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCopy(user?.wallet_address)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <CopyIcon />
              {sliceMethod(user?.wallet_address)}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
