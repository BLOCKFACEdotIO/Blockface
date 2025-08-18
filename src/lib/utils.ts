import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  commentLike,
  commentPost,
  deletePost,
  likePost,
} from "@/services/posts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isAddress } from "ethers";
import { PublicKey } from "@solana/web3.js";
import { addFollowers, removeFollowers } from "@/services/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonParse(data: string, defaultValue: unknown = null) {
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.warn(error);
    return defaultValue;
  }
}

export function sliceMethod(value: string) {
  try {
    const val = `${value?.slice(0, 4)}...${value?.slice(
      value.length - 4,
      value.length
    )}`;
    return val;
  } catch (error) {
    console.log(error);
  }
}

export function formatDateWithAgo(dateString: string): string {
  const formatted = moment(dateString).format("MMM-DD-YYYY");
  const days = moment().diff(moment(dateString), "days");
  return `${formatted} (${days} day${days !== 1 ? "s" : ""} ago)`;
}

export const formatPrice = (price: number | null) => {
  if (price === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 8 : 2,
  }).format(price);
};

export const getTotalLikes = (postInfo: any[]) =>
  postInfo?.reduce((sum, item) => sum + (item?.like === true ? 1 : 0), 0);

export const getTotalMainComments = (postInfo: any[]) =>
  postInfo?.reduce((total, item) => {
    const commentCount = item?.comments?.length || 0;
    return total + commentCount;
  }, 0) || 0;

export const getTotalReplies = (postInfo: any[]) =>
  postInfo?.reduce((total, item) => {
    const replyCount =
      item?.comments?.reduce(
        (sum: number, comment: any) => sum + (comment?.reply?.length || 0),
        0
      ) || 0;
    return total + replyCount;
  }, 0) || 0;

export const emojis = ["😊", "😂", "❤️", "👍", "😍", "😢", "😡", "🎉"];

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Liked successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostUnLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success("Like removed");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Comment posted`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllUserPosts"] });
      toast.success(`Post Deleted`);
      router.replace("/");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const defaultUserProfile = "/userDefault.webp";
export const defaultUserCover = "/defaultBanner.png";

export const validateImageAspectRatio = (
  file: File,
  expectedRatio: number,
  tolerance: number = 0.1
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const actualRatio = img.width / img.height;
      URL.revokeObjectURL(objectUrl);

      const isValid = Math.abs(actualRatio - expectedRatio) <= tolerance;

      resolve(isValid);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for aspect ratio check."));
    };

    img.src = objectUrl;
  });
};

export function formatCurrencyShort(value: number): string {
  if (isNaN(value)) return "$0";

  const absValue = Math.abs(value);
  let formatted: string;

  if (absValue >= 1.0e9) {
    formatted = (value / 1.0e9).toFixed(1) + "B";
  } else if (absValue >= 1.0e6) {
    formatted = (value / 1.0e6).toFixed(1) + "M";
  } else if (absValue >= 1.0e3) {
    formatted = (value / 1.0e3).toFixed(1) + "K";
  } else {
    formatted = value.toFixed(2);
  }

  return `$${formatted}`;
}

export function getShortTime(timestamp: string) {
  const duration = moment.duration(moment().diff(moment(timestamp)));
  if (duration.asSeconds() < 60) return `${Math.floor(duration.asSeconds())}s`;
  if (duration.asMinutes() < 60)
    return `${Math.floor(duration.asMinutes())}min`;
  if (duration.asHours() < 24) return `${Math.floor(duration.asHours())}hr`;
  if (duration.asDays() < 30) return `${Math.floor(duration.asDays())}d`;
  if (duration.asMonths() < 12) return `${Math.floor(duration.asMonths())}mo`;
  return `${Math.floor(duration.asYears())}y`;
}

export const validateWalletAddress = (walletAddress: string) => {
  if (!walletAddress) return "Wallet address is required";

  // Check for Ethereum address
  if (isAddress(walletAddress)) {
    return ""; // Valid Ethereum address
  }

  // Check for Solana address
  try {
    const publicKey = new PublicKey(walletAddress);
    if (PublicKey.isOnCurve(publicKey.toBytes())) {
      return ""; // Valid Solana address
    }
    return "Invalid Solana wallet address (must be a valid 44-character base58 address)";
  } catch (err) {
    return "Invalid Solana wallet address (must be a valid 44-character base58 address)";
  }
};

export const isSolanaAddress = (address: string): boolean => {
  try {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey.toBytes());
  } catch {
    return false;
  }
};

export const useAddFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFollowers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      toast.success(`Successfully followed the user!`);
    },
    onError: ({ message }) => {
      toast.error(message || "Failed to follow the user.");
    },
  });
};

export const useRemoveFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFollowers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      toast.success(`Successfully unfollowed the user!`);
    },
    onError: ({ message }) => {
      toast.error(message || "Failed to follow the user.");
    },
  });
};

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Liked successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const useCommentUnLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success("Like removed");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const dexRoute = "https://pumpkin.fun/token/68813faf054436510eb4a514";
