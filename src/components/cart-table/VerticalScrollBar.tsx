"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BORDER,
  SCROLL_THUMB_COLOR,
  SCROLL_TRACK_COLOR,
  SCROLLBAR_TRACK_WIDTH,
} from "@/components/visualization-grid/constants";

const SCROLLBAR_SIZES = {
  default: {
    minThumbSize: 40,
    thumbWidth: 14,
    trackWidth: SCROLLBAR_TRACK_WIDTH,
  },
  compact: {
    minThumbSize: 28,
    thumbWidth: 10,
    trackWidth: 16,
  },
} as const;

interface ScrollMetrics {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

function readScrollMetrics(element: HTMLDivElement): ScrollMetrics {
  return {
    scrollTop: element.scrollTop,
    scrollHeight: element.scrollHeight,
    clientHeight: element.clientHeight,
  };
}

interface VerticalScrollBarProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  /** Which edge of the track gets the 3.5px border (matches visualization grid). */
  trackBorder?: "top" | "left" | "none";
  size?: keyof typeof SCROLLBAR_SIZES;
}

export default function VerticalScrollBar({
  scrollRef,
  trackBorder = "left",
  size = "default",
}: VerticalScrollBarProps) {
  const scrollMetrics = SCROLLBAR_SIZES[size];
  const minThumbSize = scrollMetrics.minThumbSize;
  const verticalThumbWidth = scrollMetrics.thumbWidth;
  const scrollbarTrackWidth = scrollMetrics.trackWidth;
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const updateMetrics = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    setMetrics(readScrollMetrics(scrollElement));
  }, [scrollRef]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    updateMetrics();
    scrollElement.addEventListener("scroll", updateMetrics, { passive: true });
    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener("scroll", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [scrollRef, updateMetrics]);

  const canScrollVertically =
    metrics.scrollHeight > metrics.clientHeight + 1;

  const verticalTrackHeight = metrics.clientHeight;

  const verticalThumbHeight = canScrollVertically
    ? Math.max(
        (metrics.clientHeight / metrics.scrollHeight) * verticalTrackHeight,
        minThumbSize
      )
    : verticalTrackHeight;

  const verticalThumbTop = canScrollVertically
    ? ((metrics.scrollTop / (metrics.scrollHeight - metrics.clientHeight)) *
        (verticalTrackHeight - verticalThumbHeight)) || 0
    : 0;

  function handleVerticalThumbPointerDown(
    pointerDownEvent: React.PointerEvent<HTMLDivElement>
  ) {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !canScrollVertically) return;

    const activeScrollElement = scrollElement;

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
    pointerDownEvent.currentTarget.setPointerCapture(pointerDownEvent.pointerId);

    const startPointerY = pointerDownEvent.clientY;
    const startScrollTop = activeScrollElement.scrollTop;
    const maxScrollTop =
      activeScrollElement.scrollHeight - activeScrollElement.clientHeight;
    const maxThumbTravel = verticalTrackHeight - verticalThumbHeight;

    function handlePointerMove(pointerMoveEvent: PointerEvent) {
      const pointerDelta = pointerMoveEvent.clientY - startPointerY;
      const scrollDelta = (pointerDelta / maxThumbTravel) * maxScrollTop;
      activeScrollElement.scrollTop = Math.min(
        Math.max(startScrollTop + scrollDelta, 0),
        maxScrollTop
      );
    }

    function handlePointerUp() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

  function handleVerticalTrackClick(
    clickEvent: React.MouseEvent<HTMLDivElement>
  ) {
    const scrollElement = scrollRef.current;
    const trackElement = verticalTrackRef.current;
    if (!scrollElement || !trackElement || !canScrollVertically) return;
    if (clickEvent.target !== trackElement) return;

    const trackRect = trackElement.getBoundingClientRect();
    const clickOffset =
      clickEvent.clientY - trackRect.top - verticalThumbHeight / 2;
    const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
    const maxThumbTravel = verticalTrackHeight - verticalThumbHeight;

    scrollElement.scrollTop = Math.min(
      Math.max((clickOffset / maxThumbTravel) * maxScrollTop, 0),
      maxScrollTop
    );
  }

  const trackBorderStyle =
    trackBorder === "top"
      ? { borderTop: BORDER }
      : trackBorder === "left"
        ? { borderLeft: BORDER }
        : undefined;

  return (
    <div
      ref={verticalTrackRef}
      className="relative z-10 flex justify-center shrink-0 self-stretch min-h-0"
      style={{
        width: scrollbarTrackWidth,
        backgroundColor: SCROLL_TRACK_COLOR,
        ...trackBorderStyle,
      }}
      onClick={handleVerticalTrackClick}
      aria-hidden
    >
      <div
        className="rounded-full cursor-pointer touch-none shrink-0"
        style={{
          width: verticalThumbWidth,
          height: verticalThumbHeight,
          marginTop: verticalThumbTop,
          backgroundColor: SCROLL_THUMB_COLOR,
        }}
        onPointerDown={handleVerticalThumbPointerDown}
      />
    </div>
  );
}
