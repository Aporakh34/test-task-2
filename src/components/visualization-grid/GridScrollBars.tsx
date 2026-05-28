"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BORDER,
  SCROLL_THUMB_COLOR,
  SCROLL_TRACK_COLOR,
  SCROLLBAR_TRACK_HEIGHT,
  SCROLLBAR_TRACK_WIDTH,
} from "./constants";

const MIN_THUMB_SIZE = 40;
const VERTICAL_THUMB_WIDTH = 14;
const HORIZONTAL_THUMB_HEIGHT = 14;
const HORIZONTAL_THUMB_WIDTH = 96;

interface ScrollMetrics {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
}

interface GridScrollBarsProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  viewportWidth: number;
}

function readScrollMetrics(element: HTMLDivElement): ScrollMetrics {
  return {
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft,
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
    clientHeight: element.clientHeight,
    clientWidth: element.clientWidth,
  };
}

export default function GridScrollBars({
  scrollRef,
  viewportWidth,
}: GridScrollBarsProps) {
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
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
  const canScrollHorizontally =
    metrics.scrollWidth > metrics.clientWidth + 1;

  const verticalTrackHeight = metrics.clientHeight;

  const verticalThumbHeight = canScrollVertically
    ? Math.max(
        (metrics.clientHeight / metrics.scrollHeight) * verticalTrackHeight,
        MIN_THUMB_SIZE
      )
    : verticalTrackHeight;

  const verticalThumbTop = canScrollVertically
    ? ((metrics.scrollTop / (metrics.scrollHeight - metrics.clientHeight)) *
        (verticalTrackHeight - verticalThumbHeight)) || 0
    : 0;

  const horizontalTrackWidth = viewportWidth;

  const horizontalThumbWidth = canScrollHorizontally
    ? Math.max(
        (metrics.clientWidth / metrics.scrollWidth) * horizontalTrackWidth,
        MIN_THUMB_SIZE
      )
    : HORIZONTAL_THUMB_WIDTH;

  const horizontalThumbLeft = canScrollHorizontally
    ? ((metrics.scrollLeft / (metrics.scrollWidth - metrics.clientWidth)) *
        (horizontalTrackWidth - horizontalThumbWidth)) || 0
    : (horizontalTrackWidth - HORIZONTAL_THUMB_WIDTH) / 2;

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

  function handleHorizontalThumbPointerDown(
    pointerDownEvent: React.PointerEvent<HTMLDivElement>
  ) {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !canScrollHorizontally) return;

    const activeScrollElement = scrollElement;

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
    pointerDownEvent.currentTarget.setPointerCapture(pointerDownEvent.pointerId);

    const startPointerX = pointerDownEvent.clientX;
    const startScrollLeft = activeScrollElement.scrollLeft;
    const maxScrollLeft =
      activeScrollElement.scrollWidth - activeScrollElement.clientWidth;
    const maxThumbTravel = horizontalTrackWidth - horizontalThumbWidth;

    function handlePointerMove(pointerMoveEvent: PointerEvent) {
      const pointerDelta = pointerMoveEvent.clientX - startPointerX;
      const scrollDelta = (pointerDelta / maxThumbTravel) * maxScrollLeft;
      activeScrollElement.scrollLeft = Math.min(
        Math.max(startScrollLeft + scrollDelta, 0),
        maxScrollLeft
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

  return (
    <>
      <div
        ref={verticalTrackRef}
        className="row-start-1 col-start-2 relative z-10 flex justify-center shrink-0 self-stretch min-h-0"
        style={{
          width: SCROLLBAR_TRACK_WIDTH,
          backgroundColor: SCROLL_TRACK_COLOR,
          borderTop: BORDER,
        }}
        onClick={handleVerticalTrackClick}
        aria-hidden
      >
        <div
          className="rounded-full cursor-pointer touch-none shrink-0"
          style={{
            width: VERTICAL_THUMB_WIDTH,
            height: verticalThumbHeight,
            marginTop: verticalThumbTop,
            backgroundColor: SCROLL_THUMB_COLOR,
          }}
          onPointerDown={handleVerticalThumbPointerDown}
        />
      </div>

      <div
        className="row-start-2 col-start-1 relative z-10 min-w-0 shrink-0 py-2.5"
        style={{
          width: viewportWidth,
          height: SCROLLBAR_TRACK_HEIGHT,
          backgroundColor: SCROLL_TRACK_COLOR,
        }}
        aria-hidden
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full cursor-pointer touch-none"
          style={{
            width: canScrollHorizontally
              ? horizontalThumbWidth
              : HORIZONTAL_THUMB_WIDTH,
            height: HORIZONTAL_THUMB_HEIGHT,
            left: canScrollHorizontally
              ? horizontalThumbLeft
              : (horizontalTrackWidth - HORIZONTAL_THUMB_WIDTH) / 2,
            backgroundColor: SCROLL_THUMB_COLOR,
          }}
          onPointerDown={handleHorizontalThumbPointerDown}
        />
      </div>
    </>
  );
}
