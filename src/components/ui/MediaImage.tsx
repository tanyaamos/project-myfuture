"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getMediaFallback } from "@/lib/media";
import type { MediaAsset } from "@/lib/media";

interface MediaImageProps {
  asset: MediaAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/** Renders local ASU asset with automatic Unsplash fallback on missing file */
export function MediaImage({
  asset,
  className = "object-cover",
  priority = false,
  sizes = "100vw",
  fill = true,
}: MediaImageProps) {
  const [src, setSrc] = useState(asset.local);

  useEffect(() => {
    setSrc(asset.local);
  }, [asset.local]);

  return (
    <Image
      src={src}
      alt={asset.alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => setSrc(getMediaFallback(asset))}
    />
  );
}
