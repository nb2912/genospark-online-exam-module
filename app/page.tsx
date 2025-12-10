"use client";

import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuestionRenderer from "./components/QuestionRenderer";
import Navigator from "./components/Navigator";
import HelpModal from "./components/HelpModal";
import { Question } from "./types/types";
import questionsData from "./data/questions.json";

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number | string, any>>({});
  const [showNavigator, setShowNavigator] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Timer state
  const DEFAULT_MINUTES = 30;
  const [remainingSec, setRemainingSec] = useState(DEFAULT_MINUTES * 60);
  const timerRef = useRef<number | null>(null);
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    setQuestions(questionsData as Question[]);
  }, []);

  useEffect(() => {
    if (remainingSec <= 0) {
      setTimeExpired(true);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setTimeExpired(true);
          setTimeout(() => alert("Time has expired."), 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const onAnswerSelect = (qid: number | string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qid]: { ...prev[qid], value } }));
  };

  // <-- FIXED: No separate isMarked state. Toggle flagged only inside answers[qid]
  const onFlagToggle = () => {
    const q = questions[current];
    if (!q) return;
    const qid = q.id;
    setAnswers((prev) => ({
      ...prev,
      [qid]: { ...prev[qid], flagged: !prev[qid]?.flagged },
    }));
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else alert("Submit (demo): " + JSON.stringify(answers, null, 2));
  };

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));

  useEffect(() => {
    if (questions.length > 0 && current >= questions.length) setCurrent(questions.length - 1);
  }, [questions, current]);

  return (
    <>
      <Header
        userName="First Name Last Name"
        timeRemaining={formatTime(remainingSec)}
        current={questions.length ? current + 1 : 0}
        total={questions.length}
        // pass per-question flag only
        isMarked={!!answers[questions[current]?.id]?.flagged}
        onToggleMark={onFlagToggle}
        timeExpired={timeExpired}
      />

      <main className="w-full pt-[86px] pb-32">
        {questions.length === 0 ? (
          <div className="text-center py-24">Loading questions...</div>
        ) : (
          <QuestionRenderer
            question={questions[current]}
            selectedAnswer={answers[questions[current].id]?.value}
            onAnswerSelect={onAnswerSelect}
          />
        )}
      </main>

      <Footer
        onHelp={() => setShowHelp(true)}
        onNavigator={() => setShowNavigator(true)}
        onPrevious={goPrev}
        onNext={goNext}
        isFirstQuestion={current === 0}
      />

      {showNavigator && (
        <Navigator
          questions={questions}
          answers={answers}
          current={current}
          onClose={() => setShowNavigator(false)}
          onGoto={(i) => {
            setCurrent(i);
            setShowNavigator(false);
          }}
        />
      )}

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
}
