"use client";

import React from "react";

type NavQuestion = {
  id: number | string;
  title?: string;
};

export default function Navigator({
  questions,
  answers,
  onClose,
  onGoto,
  current,
}: {
  questions: NavQuestion[];
  answers: Record<number | string, any>;
  onClose: () => void;
  onGoto: (index: number) => void;
  current: number;
}) {
  const incompleteCount = questions.reduce((acc, q, i) => {
    const a = answers[q.id];
    const status = a?.value ? "" : i < current ? "Incomplete" : "Unseen";
    return acc + (status === "Unseen" || status === "Incomplete" ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">

      {/* MAIN NAVIGATOR BOX (2/3 WIDTH) */}
      <div className="w-[620px] max-h-[80vh] bg-white border-[3px] border-[#0f6ca6] flex flex-col">

        {/* Top Bar */}
        <div className="bg-[#0f6ca6] text-white px-4 py-2 text-[18px] font-semibold flex items-center gap-3">

          {/* NEW PEARSON VUE NAVIGATOR ICON (4 dots) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="2" stroke="#e6e6e6" strokeWidth="2" />
            <circle cx="16" cy="8" r="2" stroke="#e6e6e6" strokeWidth="2" />
            <circle cx="8" cy="16" r="2" stroke="#e6e6e6" strokeWidth="2" />
            <circle cx="16" cy="16" r="2" stroke="#e6e6e6" strokeWidth="2" />
          </svg>

          <span>Navigator</span>
          <span className="text-[13px] font-normal ml-2">
            - select a question to go to it
          </span>
        </div>

        {/* COLUMN HEADERS */}
        <div className="grid grid-cols-[1fr_130px_150px] bg-[#4a7ebb] text-white font-bold text-[14px] border-t border-[#0f6ca6]">
          <div className="px-3 py-1.5 border-r-2 border-white/40">
            Question #
          </div>
          <div className="px-3 py-1.5 border-r-2 border-white/40">
            Status
          </div>
          <div className="px-3 py-1.5">
            Marked for Review
          </div>
        </div>

        {/* TABLE BODY */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 160px)" }}>
          {questions.map((q, index) => {
            const ans = answers[q.id];
            const flagged = !!ans?.flagged;

            let status = "";
            if (!ans?.value) status = index < current ? "Incomplete" : "Unseen";

            const zebra = index % 2 === 0 ? "bg-white" : "bg-gray-100";
            const highlight = index === current ? "bg-yellow-200" : "";

            return (
              <div
                key={String(q.id)}
                onClick={() => onGoto(index)}
                className={`grid grid-cols-[1fr_130px_150px] cursor-pointer
                  border-b border-gray-300 text-[13px] ${zebra} ${highlight}`}
              >
                <div className="px-3 py-1.5 text-[14px]">
                  {q.title ?? `Question ${index + 1}`}
                </div>

                <div className="px-3 py-1.5 text-[13px] font-semibold text-red-600">
                  {status}
                </div>

                <div className="px-3 py-1.5 flex items-center">
                  {flagged && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 3v18" stroke="#0f6ca6" strokeWidth="2" />
                      <path
                        d="M6 6c3-1.5 6-1.5 9 0v9c-3-1.5-6-1.5-9 0V6z"
                        stroke="#0f6ca6"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SUMMARY + CLOSE BUTTON */}
        <div className="bg-[#0f6ca6] text-white px-4 py-3">
          <div className="text-[15px] font-medium">
            {incompleteCount} Unseen/Incomplete
          </div>

          <div className="w-full flex justify-end mt-2 pr-1">
            <button
              onClick={onClose}
              className="
                px-4 
                py-[4px]
                text-[16px] 
                font-semibold 
                border border-white 
                text-white
                hover:bg-white hover:text-[#0f6ca6]
                transition 
                rounded-sm
              "
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
