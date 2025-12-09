"use client";

import React from "react";

type FooterProps = {
  onHelp: () => void;
  onNavigator: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion?: boolean;
};

export default function Footer({
  onHelp,
  onNavigator,
  onPrevious,
  onNext,
  isFirstQuestion = false,
}: FooterProps) {
  const prevPlaceholderWidth = "w-[120px]";

  return (
    <footer
      aria-label="Test footer"
      className="fixed left-0 right-0 bottom-0 z-[60] bg-[#0f6ca6] text-white flex items-center justify-between
                 rounded-br-[6px]"
      style={{ height: 36 }} // shorter height as requested
    >
      {/* LEFT - Help (restored) */}
      <div className="flex items-center">
        <button
          onClick={onHelp}
          aria-label="Help"
          className="flex items-center gap-2 h-full px-2 text-white hover:text-[#ffd200] transition-colors"
        >
          <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-sm bg-[rgba(255,255,255,0.06)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M9.5 9.5c0-1 1-2 2.5-2s2.5 1 2.5 2c0 1.2-1 1.6-1.8 2.3-.9.8-.7 1.7-.7 2.4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="12" cy="18" r="0.6" fill="currentColor" />
            </svg>
          </span>

          <span className="text-[14px] font-medium select-none">Help</span>
        </button>

        {/* SEPARATOR after Help */}
        <div className="h-6 border-l-2 border-white/80 ml-3" />
      </div>

      {/* Right group */}
      <div className="flex items-center pr-2">
        {/* Previous (or placeholder) */}
        {!isFirstQuestion ? (
          <button
            onClick={onPrevious}
            aria-label="Previous"
            className="group flex items-center gap-2 h-[30px] px-4 bg-[#0f6ca6]
                       border-l-2 border-white/80 hover:bg-white/5 transition select-none mr-1"
          >
            <svg className="text-white group-hover:text-[#ffd200] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 4L7 12l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span className="text-[15px] font-semibold text-white group-hover:text-[#ffd200]">
              Previous
            </span>
          </button>
        ) : (
          <div className={`${prevPlaceholderWidth} mr-1`} />
        )}

        {/* thick divider */}
        <div className="h-6 border-l-2 border-white/80 mx-1" />

        {/* Navigator (restored original 4-circle SVG) */}
        <button
          onClick={onNavigator}
          aria-label="Navigator"
          className="group flex items-center gap-2 h-[30px] px-4 bg-[#0f6ca6] hover:bg-white/5 transition select-none mx-1"
        >
          {/* restored navigator svg — uses currentColor for stroke so hover color applies */}
          <svg className="text-white group-hover:text-[#ffd200] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="6.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <circle cx="17.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <circle cx="6.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <circle cx="17.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>

          <span className="text-[15px] font-semibold text-white group-hover:text-[#ffd200]">
            Navigator
          </span>
        </button>

        {/* thick divider */}
        <div className="h-6 border-l-2 border-white/80 mx-1" />

        {/* Next */}
        <button
          onClick={onNext}
          aria-label="Next"
          className="group flex items-center gap-2 h-[30px] px-4 bg-[#0f6ca6]
                     hover:bg-white/5 transition select-none rounded-br-[6px] ml-1"
        >
          <span className="text-[15px] font-semibold text-white group-hover:text-[#ffd200]">
            Next
          </span>

          <svg className="text-white group-hover:text-[#ffd200] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
