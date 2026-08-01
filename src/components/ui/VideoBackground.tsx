"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getMediaFallback, resolveMedia, type MediaAsset } from "@/lib/media";

interface VideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  mediaAsset?: MediaAsset;
  overlay?: "dark" | "warm" | "bright" | "none";
  kenBurns?: boolean;
  className?: string;
  priority?: boolean;
}

const overlayStyles = {
  dark: "bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80",
  warm: "bg-gradient-to-b from-asu-maroon/60 via-charcoal/30 to-sandstone-100/20",
  bright: "bg-gradient-to-b from-white/90 via-sandstone-50/80 to-sandstone-100/90",
  none: "",
};

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2400&q=80";

export function VideoBackground({
  videoSrc,
  posterSrc,
  imageSrc,
  imageAlt = "Atmospheric background",
  mediaAsset,
  overlay = "dark",
  kenBurns = true,
  className = "",
  priority = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [resolvedImageSrc, setResolvedImageSrc] = useState(() =>
    mediaAsset ? resolveMedia(mediaAsset) : (imageSrc ?? DEFAULT_FALLBACK_IMAGE),
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || videoFailed) return;

    video.play().catch(() => setVideoFailed(true));
  }, [videoSrc, videoFailed]);

  useEffect(() => {
    if (mediaAsset) {
      setResolvedImageSrc(resolveMedia(mediaAsset));
      return;
    }

    setResolvedImageSrc(imageSrc ?? DEFAULT_FALLBACK_IMAGE);
  }, [mediaAsset, imageSrc]);

  const showVideo = videoSrc && !videoFailed;
  const fallbackImage = resolvedImageSrc;
  const resolvedImageAlt = mediaAsset?.alt ?? imageAlt;

  const handleImageError = () => {
    if (mediaAsset) {
      setResolvedImageSrc(getMediaFallback(mediaAsset));
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {showVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${kenBurns ? "animate-ken-burns" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc ?? fallbackImage}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className={`absolute inset-0 ${kenBurns ? "animate-ken-burns" : ""}`}>
          <Image
            src={fallbackImage}
            alt={resolvedImageAlt}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
            onError={handleImageError}
          />
        </div>
      )}

      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
      )}

      <div className="grain-overlay absolute inset-0" />
      <div className="cinematic-vignette absolute inset-0" />
    </div>
  );
}
