
"use client";

import { useEffect, useRef } from "react";
import type OpenSeadragon from "openseadragon";
import { LuHouse, LuMaximize, LuZoomIn, LuZoomOut } from "react-icons/lu";

type ImageZoomViewerProps = {
  imageSrc: string;
  className?: string;
};

export default function ImageZoomViewer({
  imageSrc,
  className = "",
}: ImageZoomViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const osdInstance = useRef<OpenSeadragon.Viewer | null>(null);

  const zoomInRef = useRef<HTMLButtonElement>(null);
  const zoomOutRef = useRef<HTMLButtonElement>(null);
  const homeRef = useRef<HTMLButtonElement>(null);
  const fullPageRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    let mounted = true;

    const initViewer = async () => {
      const OpenSeadragon = (await import("openseadragon")).default;

      if (!mounted || !viewerRef.current) return;

      osdInstance.current = OpenSeadragon({
        element: viewerRef.current,

        tileSources: {
          type: "image",
          url: imageSrc,
        },

        showNavigationControl: true,

        zoomInButton: zoomInRef.current!,
        zoomOutButton: zoomOutRef.current!,
        homeButton: homeRef.current!,
        fullPageButton: fullPageRef.current!,

        mouseNavEnabled: true,

        gestureSettingsMouse: {
          scrollToZoom: true,
          clickToZoom: true,
          dblClickToZoom: true,
          pinchToZoom: true,
          dragToPan: true,
        },

        gestureSettingsTouch: {
          pinchToZoom: true,
          dragToPan: true,
          flickEnabled: true,
        },

        animationTime: 1.2,
        springStiffness: 6.5,
        visibilityRatio: 1,
        constrainDuringPan: true,
      });
    };

    initViewer();

    return () => {
      mounted = false;
      osdInstance.current?.destroy();
      osdInstance.current = null;
    };
  }, [imageSrc]);

  const btnClassName =
    "group relative isolate grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-black/10 bg-white text-black transition-all duration-300 after:absolute after:left-0 after:top-0 after:z-0 after:h-full after:w-full after:-translate-x-full after:rounded-full after:bg-black after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:translate-x-0";

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div
        ref={viewerRef}
        className="relative h-100 md:h-125 w-full bg-black/2 "
      />

      <div className="absolute bottom-3 right-3 z-20 flex gap-2">
        <button
          ref={zoomInRef}
          type="button"
          aria-label="Zoom In"
          className={btnClassName}
        >
          <LuZoomIn className="relative z-10 transition-colors duration-300 group-hover:text-white" size={18} />
        </button>

        <button
          ref={zoomOutRef}
          type="button"
          aria-label="Zoom Out"
          className={btnClassName}
        >
          <LuZoomOut className="relative z-10 transition-colors duration-300 group-hover:text-white" size={18} />
        </button>

        <button
          ref={homeRef}
          type="button"
          aria-label="Reset"
          className={btnClassName}
        >
          <LuHouse className="relative z-10 transition-colors duration-300 group-hover:text-white" size={18} />
        </button>

        <button
          ref={fullPageRef}
          type="button"
          aria-label="Fullscreen"
          className={btnClassName}
        >
          <LuMaximize className="relative z-10 transition-colors duration-300 group-hover:text-white" size={18} />
        </button>
      </div>
    </div>
  );
}
