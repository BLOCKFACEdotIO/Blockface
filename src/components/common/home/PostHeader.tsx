import React, { useState } from "react";
import ToolTip from "../tool-tip";
import {
  Edit,
  Ellipsis,
  ListTodo,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import {
  defaultUserProfile,
  getShortTime,
  useAddFollower,
  usePostDelete,
  useRemoveFollower,
} from "@/lib/utils";
import toast from "react-hot-toast";
import CreatePostModal from "../CreatePostModal";
import FollowBtn from "../FollowBtn";
import DotsLoader from "../DotsLoader";

export default function PostHeader({ post }: any) {
  const { user } = useAuth();
  const deletePost = usePostDelete();
  const followUser = useAddFollower();
  const unFollowUser = useRemoveFollower();
  const router = useRouter();

  const [postModal, setPostModal] = useState<boolean>(false);

  const handleDeletePost = () => {
    try {
      if (user.id) {
        deletePost.mutate({
          id: post?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login");
    }
  };

  const handleFollow = () => {
    try {
      if (user.id) {
        followUser.mutate({
          id: post?.userInfo?.id,
          followerId: user?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = () => {
    try {
      if (user.id) {
        unFollowUser.mutate({
          id: post?.userInfo?.id,
          followerId: user?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-14">
          <AvatarImage
            width={100}
            height={100}
            className="w-14 h-14 object-cover"
            src={post?.userInfo?.avatar ?? defaultUserProfile}
          />
          <AvatarFallback>
            <DotsLoader size="w-2 h-2" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div
            className="hover:underline dark:text-[#DDE5EE] font-semibold flex items-center gap-2 cursor-pointer flex-wrap break-all"
            // onClick={() => router.replace(`/${post?.userInfo?.id}`)}
          >
            {post?.userInfo?.username}{" "}
            <div className="text-sm text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00] font-normal">
              $
              {post?.userInfo?.assets?.totalBalanceUSD
                ? post?.userInfo?.assets?.totalBalanceUSD?.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )
                : 0}
              {post.userInfo?.id && post.userInfo?.id === 91 ? "📌" : ""}
            </div>
          </div>
          <div className="text-sm dark:text-[#8C9FB7A0] text-[#999999] break-all">
            @{post?.userInfo?.username} .{" "}
            <ToolTip content={moment(post?.createdAt).format("MMM-DD-YYYY")}>
              {" "}
              {getShortTime(post?.createdAt)}
            </ToolTip>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <FollowBtn handleSubmit={handleFollow} />
        {String(post?.userInfo?.id) === String(user?.id) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:bg-[#F1F1F1] dark:hover:bg-[#13151A] rounded-full p-2 cursor-pointer">
                <Ellipsis
                  className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  size={16}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {/* <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setPostModal(true)}
                >
                  <Edit className="" /> Edit
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  className="text-red-700 hover:text-red-700 cursor-pointer"
                  onClick={handleDeletePost}
                >
                  <Trash2 className="text-red-700" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <CreatePostModal
        open={postModal}
        onClose={() => setPostModal(false)}
        post={post}
      />
    </div>
  );
}
