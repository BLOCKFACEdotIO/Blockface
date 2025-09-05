"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (_) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3742696288532239"
      data-ad-slot="9538034285"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="off"
    />
  );
}
