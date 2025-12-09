"use client";

import React, { useEffect } from "react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <>
      {/* overlay (VERY soft blur, 50% less than before) */}
      <div className="fixed inset-0 z-[48] bg-[rgba(0,0,0,0.03)] backdrop-blur-sm" />

      {/* centered modal wrapper */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]
                   bg-white p-[0.5px] border-[0.5px] border-white"
        role="presentation"
      >
        {/* modal box */}
        <div
          role="dialog"
          aria-modal="true"
          className="w-[780px] bg-white border-[4px] border-[#0f6ca6]
                     shadow-[6px_6px_0_rgba(0,0,0,0.08)]"
        >
          {/* HEADER */}
          <div
            className="h-[46px] flex items-center justify-between px-[14px] pr-[10px]
                       bg-[#0f6ca6] border-b-[2px] border-b-[rgba(255,255,255,0.9)]"
            aria-hidden
          >
            <div className="flex items-center gap-[10px] text-white font-semibold text-[20px] leading-none">
              <span className="w-[26px] h-[26px] flex items-center justify-center" aria-hidden>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.2v1.6" strokeLinecap="round" />
                  <path d="M11 11h1c1.1 0 1.9.55 1.9 1.6 0 1.25-.9 2.1-1.9 2.1h-1" strokeLinecap="round" />
                </svg>
              </span>

              <span>Help</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close help"
              title="Close"
              className="inline-flex items-center justify-center w-[28px] h-[28px]
                         border-[2px] border-[rgba(255,255,255,0.95)] bg-[#0f6ca6]
                         text-white transition-all duration-120 ease-in-out
                         focus:outline-none focus:ring-3 focus:ring-[rgba(15,108,166,0.18)]
                         hover:bg-[#ffd200] hover:border-[#ffd200] hover:text-[#0b0b0b]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6L18 18" strokeLinecap="round" />
                <path d="M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-[22px] h-[280px] overflow-y-auto text-[17px] leading-[1.35] text-[#000] bg-white">
            <h2 className="text-[22px] font-bold mb-[10px] underline">Introduction</h2>

            <p className="mb-[14px]">
              This is an example of a Multiple Choice Item (MCQ). The candidate would select one option from a predefined list of responses.
            </p>

            <p className="mb-[14px]">
              Content for either the stem or the responses may be in text or graphic form, and be accompanied by other information, such as tables.
            </p>

            <h2 className="text-[22px] font-bold mb-[10px] underline">Answering the Item</h2>

            <p className="mb-[14px]">
              A candidate can select responses in the same way they would for a Multiple Choice item, by:
            </p>

            {/* radio example */}
            <div className="my-[10px] mb-[18px]">
              <div className="w-[240px] border-[2px] border-[#d5d5d5] bg-white p-[12px]
                               inline-block align-top shadow-[3px_3px_6px_rgba(0,0,0,0.25)]">

                <div className="flex gap-[12px] items-center">

                  {/* Selected Pearson radio */}
                  <div className="w-[40px] h-[40px] border-[2px] border-[#0b0b0b] rounded-[4px]
                                  flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-[22px] h-[22px] rounded-full border-[4px] border-[#005daa]" />
                      <div className="absolute w-[12px] h-[12px] rounded-full bg-[#005daa]" />
                    </div>
                  </div>

                  <div className="text-[20px] font-semibold">A. Blue</div>
                </div>

              </div>
            </div>

            {/* bullets */}
            <ul className="mt-[6px] space-y-[10px] ml-[6px]">
              <li className="flex items-start gap-3">
                <span className="mt-[7px] block w-[7px] h-[7px] bg-black rounded-full" />
                <span>Selecting the button with a mouse click.</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-[7px] block w-[7px] h-[7px] bg-black rounded-full" />
                <span>Pressing a hotkey on the keyboard (e.g., pressing the 'A' key to select response A).</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-[7px] block w-[7px] h-[7px] bg-black rounded-full" />
                <span>Pressing tab to cycle through responses, and pressing the Space bar on the keyboard.</span>
              </li>
            </ul>

            <p className="mt-[18px] mb-[14px]">Some of these selection methods can also be turned off.</p>
          </div>
        </div>
      </div>
    </>
  );
}
