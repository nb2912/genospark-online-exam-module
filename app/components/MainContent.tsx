"use client";

import React from "react";
import { Question } from "../types/types";

interface Props {
  question: Question;
  onAnswerSelect: (questionId: number, answerId: string) => void;
  selectedAnswer?: string;
}

export default function MainContent({ question, onAnswerSelect, selectedAnswer }: Props) {
  const accent = "#0f6ca6";

  return (
    <main className="w-full max-w-[1180px] mx-auto pt-[10px] pb-[90px]">
      {/* Title strip */}
      <div className="mb-3">
        <div className="bg-[#dff1ff] border border-[#0f6ca6] px-2">
          <div
            className="text-[17px] font-semibold px-2 py-[6px]"
            style={{ borderLeft: `6px solid ${accent}` }}
          >
            {question.title}
          </div>
        </div>
      </div>

      {/* Main white panel */}
      <div
        className="bg-white"
        style={{
          borderLeft: `4px solid ${accent}`,
          border: "1px solid #c8c8c8",
          padding: "20px 22px",
        }}
      >
        {/* Question text */}
        <div
          className="text-[17px] leading-[1.45] text-[#111] mb-4"
          dangerouslySetInnerHTML={{ __html: question.text }}
        />

        {/* Options */}
        <div className="space-y-3 mt-2">
          {question.answers.map((answer, index) => (
            <label
              key={answer.id}
              className="flex items-start gap-4 cursor-pointer py-[6px] px-1 rounded hover:bg-slate-50"
            >
              {/* Radio */}
              <input
                id={answer.id}
                type="radio"
                name={`answer-${question.id}`}
                checked={selectedAnswer === answer.id}
                onChange={() => onAnswerSelect(question.id, answer.id)}
                className="w-4 h-4 mt-[4px]"
                style={{ accentColor: accent }}
              />

              {/* Label text */}
              <div className="text-[16px] text-[#111] leading-[1.35]">
                <span className="font-semibold mr-1">
                  {String.fromCharCode(65 + index)}.
                </span>

                {answer.text}
              </div>
            </label>
          ))}
        </div>
      </div>
    </main>
  );
}
