// components/QuestionRenderer.tsx
"use client";

import React from "react";
import { Question } from "../types/types";

type Props = {
  question: Question;
  onAnswerSelect: (qid: number, val: any) => void;
  selectedAnswer: any;
};

/**
 * Full-width Pearson-VUE-like QuestionRenderer.
 * - Full viewport width (no centered box)
 * - Left narrow options column, right large content/image column
 * - Blue title strip, left accent border, spacing tuned to screenshots
 */
export default function QuestionRenderer({ question, onAnswerSelect, selectedAnswer }: Props) {
  if (!question) return null;

  const accent = "#0f6ca6"; // Pearson-blue accent

  const renderLabel = (idx: number, aId?: string) => {
    if (aId && /^[A-Z]$/.test(aId)) return `${aId}.`;
    return `${String.fromCharCode(65 + idx)}.`; // A., B., ...
  };

  return (
    <section className="w-full min-h-[300px]">
      {/* Title strip full width (thin blue strip with left accent) */}
      <div className="w-full mt-3 px-[48px]"> {/* left gutter matches screenshot */}
        <div
          className="bg-[#dff1ff] border border-[#0f6ca6] overflow-hidden"
          style={{ boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.06)" }}
        >
          <div
            className="text-[18px] font-semibold px-3 py-1"
            style={{ borderLeft: `6px solid ${accent}` }}
          >
            {question.title}
          </div>
        </div>
      </div>

      {/* Full-width content area with left gutter and right gutter matching screenshots */}
      <div className="w-full px-[48px] mt-4"> {/* gutters */}
        <div
          className="bg-white"
          style={{
            borderLeft: `4px solid ${accent}`,
            border: "1px solid #d6d6d6",
            padding: "22px",
            boxSizing: "border-box",
            minHeight: "420px",
          }}
        >
          {/* Grid: left = narrow options col, right = big content */}
          <div className="grid grid-cols-[360px_1fr] gap-8">
            {/* LEFT column: prompt + options (narrow) */}
            <div>
              {/* Prompt / question short text */}
              <div
                className="text-[18px] leading-[1.45] text-[#111] mb-6"
                dangerouslySetInnerHTML={{ __html: question.prompt ?? question.text }}
              />

              {/* Options area: compact spacing, same vertical rhythm as screenshot */}
              <div className="space-y-6">
                {/* SINGLE */}
                {question.type === "single" &&
                  question.answers?.map((a, idx) => (
                    <label key={a.id} className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${question.id}`}
                        checked={selectedAnswer === a.id}
                        onChange={() => onAnswerSelect(question.id, a.id)}
                        className="w-4 h-4 mt-1"
                        style={{ accentColor: accent }}
                      />
                      <div>
                        <div className="text-[15px] font-semibold text-slate-700 mb-2">
                          {renderLabel(idx, a.id)}
                        </div>
                        <div className="text-[16px] leading-[1.4]" dangerouslySetInnerHTML={{ __html: a.text }} />
                      </div>
                    </label>
                  ))}

                {/* MULTIPLE */}
                {question.type === "multiple" &&
                  question.answers?.map((a, idx) => {
                    const arr = Array.isArray(selectedAnswer) ? selectedAnswer : [];
                    const checked = arr.includes(a.id);
                    return (
                      <label key={a.id} className="flex items-start gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const set = new Set(arr);
                            if (set.has(a.id)) set.delete(a.id);
                            else set.add(a.id);
                            onAnswerSelect(question.id, Array.from(set));
                          }}
                          className="w-4 h-4 mt-1"
                          style={{ accentColor: accent }}
                        />
                        <div>
                          <div className="text-[15px] font-semibold text-slate-700 mb-2">
                            {renderLabel(idx, a.id)}
                          </div>
                          <div className="text-[16px] leading-[1.4]" dangerouslySetInnerHTML={{ __html: a.text }} />
                        </div>
                      </label>
                    );
                  })}

                {/* TRUE/FALSE */}
                {question.type === "truefalse" &&
                  question.answers?.map((a, idx) => (
                    <label key={a.id} className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${question.id}`}
                        checked={selectedAnswer === a.id}
                        onChange={() => onAnswerSelect(question.id, a.id)}
                        className="w-4 h-4"
                        style={{ accentColor: accent }}
                      />
                      <div className="text-[16px]" dangerouslySetInnerHTML={{ __html: a.text }} />
                    </label>
                  ))}

                {/* SHORT */}
                {question.type === "short" && (
                  <div>
                    <input
                      type="text"
                      value={selectedAnswer ?? ""}
                      onChange={(e) => onAnswerSelect(question.id, e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded text-[15px] w-[260px]"
                    />
                  </div>
                )}

                {/* DROPDOWN */}
                {question.type === "dropdown" && (
                  <div>
                    <select
                      value={selectedAnswer ?? ""}
                      onChange={(e) => onAnswerSelect(question.id, e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded text-[15px] min-w-[220px]"
                    >
                      <option value="">Select...</option>
                      {question.answers?.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.text}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT column: large image or long instructions area */}
            <div>
              {question.image ? (
                <div className="flex justify-start">
                  <img
                    src={question.image}
                    alt=""
                    className="max-w-[720px] w-full object-cover shadow-[6px_6px_20px_rgba(0,0,0,0.18)]"
                  />
                </div>
              ) : (
                // If there's additional long text (meta.longText) place here, otherwise leave blank to match empty-right screenshot
                <div className="text-[16px] text-[#111] leading-[1.45]">
                  {question.meta?.longText ? (
                    <div dangerouslySetInnerHTML={{ __html: question.meta.longText }} />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
