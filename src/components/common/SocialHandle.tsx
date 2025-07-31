import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SocialHandle() {
  const { theme } = useTheme();
  const socialData = [
    {
      img: theme === "dark" ? "/telegram-white.png" : "/telegram-black.png",
      link: "https://t.me/Theblockfacegroup",
    },
    {
      img: theme === "dark" ? "/github-white.png" : "/github.png",
      link: "https://github.com/BLOCKFACEdotIO/AboutBlockface",
    },
    {
      img: theme === "dark" ? "/gitbook-white.png" : "/gitbook.svg",
      link: "https://blockface.gitbook.io/blockface",
    },
    {
      img: theme === "dark" ? "/twitter-white.png" : "/twitter-black.png",
      link: "https://x.com/Blockfacedotio?t=tIPeY6QBQgPj6rNRXlMArA&s=09",
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {socialData.map((item, idx) => (
        <Link href={item?.link} target="_blank" key={idx}>
          <Image
            src={item?.img}
            alt={item?.img}
            width={20}
            height={20}
            className="min-w-[20px] max-w-[20px] max-h-[20px] min-h-[20px]"
          />
        </Link>
      ))}
    </div>
  );
}
