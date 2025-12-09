"use client";

import React from "react";

type HeaderProps = {
  userName?: string;
  timeRemaining?: string;
  current?: number;
  total?: number;
  isMarked?: boolean;
  onToggleMark?: () => void;
  timeExpired?: boolean;
};

export default function Header({
  userName = "First Name Last Name",
  timeRemaining = "30:00",
  current = 0,
  total = 0,
  isMarked = false,
  onToggleMark = () => {},
  timeExpired = false,
}: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-[70]">
      {/* TOP BAR */}
      <div
        className="w-full flex items-center justify-between bg-[#0f6ca6] text-white"
        style={{ height: 44, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.08)" }}
      >
        <div className="pl-4">
          <h1 className="text-[20px] font-semibold leading-none select-none">
            Demo - Pearson VUE Test Driver -{" "}
            <span className="font-normal">{userName}</span>
          </h1>
        </div>

        {/* Right (stacked layout) */}
        <div className="flex flex-col items-end pr-4 leading-tight">
          {/* Time remaining */}
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.6" />
              <path
                d="M12 7v6l4 2"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <span className="text-[15px] font-medium select-none">
              {timeExpired ? "Time Expired" : `Time Remaining ${timeRemaining}`}
            </span>
          </div>

          {/* Question count */}
          <div className="flex items-center gap-2 mt-[2px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="1.2"
                stroke="white"
                strokeWidth="1.4"
              />
              <path
                d="M7 9h6"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M7 12h4"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>

            <span className="text-[15px] font-medium select-none">
              {current} of {total}
            </span>
          </div>
        </div>
      </div>

      {/* SECOND BAR (Flag Line) */}
      <div
        className="w-full flex items-center justify-between bg-[#4a7ebb] text-white"
        style={{
          height: 30,
          borderBottom: "3px solid #0f6ca6",
        }}
      >
        <div className="pl-4" />

        {/* FLAG BUTTON */}
        <div className="pr-4">
          <button
            onClick={onToggleMark}
            className="flex items-center gap-2 text-[15px] font-medium hover:text-[#ffd200] focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 3v18"
                stroke={isMarked ? "#ffd200" : "white"}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M6 6c3-1.5 6-1.5 9 0v9c-3-1.5-6-1.5-9 0V6z"
                stroke={isMarked ? "#ffd200" : "white"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            <span>
              Mark for Review
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
