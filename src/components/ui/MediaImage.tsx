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

const DEFAULT_FALLBACK_IMAGE = "/images/scenes/opening.jpg";

/** Renders local ASU asset with automatic local fallback on missing file */
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

  const handleError = () => {
    if (src === asset.local) {
      setSrc(getMediaFallback(asset));
      return;
    }

    if (src !== DEFAULT_FALLBACK_IMAGE) {
      setSrc(DEFAULT_FALLBACK_IMAGE);
    }
  };

  return (
    <Image
      src={src}
      alt={asset.alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={handleError}
    />
  );
}
