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
  overlay?: "dark" | "warm" | "bright" | "campusHero" | "none";
  kenBurns?: boolean;
  className?: string;
  priority?: boolean;
}

const overlayStyles = {
  dark: "bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80",
  warm: "bg-gradient-to-b from-asu-maroon/60 via-charcoal/30 to-sandstone-100/20",
  bright: "bg-gradient-to-b from-white/90 via-sandstone-50/80 to-sandstone-100/90",
  campusHero:
    "bg-gradient-to-b from-charcoal/60 from-0% via-charcoal/20 via-[28%] to-transparent to-[45%]",
  none: "",
};

const DEFAULT_FALLBACK_IMAGE = "/images/scenes/opening.jpg";

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
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [resolvedImageSrc, setResolvedImageSrc] = useState(() =>
    mediaAsset ? resolveMedia(mediaAsset) : (imageSrc ?? DEFAULT_FALLBACK_IMAGE),
  );

  useEffect(() => {
    if (imageSrc) {
      setResolvedImageSrc(imageSrc);
      return;
    }

    if (mediaAsset) {
      setResolvedImageSrc(resolveMedia(mediaAsset));
      return;
    }

    setResolvedImageSrc(DEFAULT_FALLBACK_IMAGE);
  }, [mediaAsset, imageSrc]);

  useEffect(() => {
    setVideoReady(false);
    setVideoFailed(false);
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || videoFailed) return;

    const onReady = () => setVideoReady(true);
    const onFail = () => setVideoFailed(true);

    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onFail);
    video.play().catch(onFail);

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onFail);
    };
  }, [videoSrc, videoFailed]);

  const showVideo = Boolean(videoSrc && videoReady && !videoFailed);
  const resolvedImageAlt = mediaAsset?.alt ?? imageAlt;

  const handleImageError = () => {
    if (mediaAsset && resolvedImageSrc === mediaAsset.local) {
      setResolvedImageSrc(getMediaFallback(mediaAsset));
      return;
    }

    if (resolvedImageSrc !== DEFAULT_FALLBACK_IMAGE) {
      setResolvedImageSrc(DEFAULT_FALLBACK_IMAGE);
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 ${kenBurns && !showVideo ? "animate-ken-burns" : ""}`}>
        <Image
          src={resolvedImageSrc}
          alt={resolvedImageAlt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
          onError={handleImageError}
        />
      </div>

      {videoSrc && !videoFailed ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-100" : "opacity-0"
          } ${kenBurns && showVideo ? "animate-ken-burns" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc ?? resolvedImageSrc}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
      )}

      <div className="grain-overlay absolute inset-0" />
      <div className="cinematic-vignette absolute inset-0" />
    </div>
  );
}
