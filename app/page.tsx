"use client";

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ReviewScreen from './components/ReviewScreen';
import { examData } from './lib/mock-data';
import { Question } from './types/types';

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userName, setUserName] = useState<string>("User");

  // Fetch user data from login/session
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user from localStorage (or you can fetch from an API)
        const storedUser = localStorage.getItem('userName');
        if (storedUser) {
          setUserName(storedUser);
        } else {
          // Try to fetch from session API if available
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            setUserName(data.name || "User");
          }
        }
      } catch (error) {
        console.log('User data not available');
      }
    };

    fetchUserData();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowReviewScreen(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleFlagQuestion = (questionId: number) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const handleQuestionSelect = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
    setShowReviewScreen(false);
  };

  const handleEndReview = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmEndExam = () => {
    // Handle exam submission logic here
    alert('Exam submitted successfully!');
  };

  const currentQuestion = examData.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userName={userName} />
      <main className="grow">
        {showReviewScreen ? (
          <ReviewScreen
            questions={examData.questions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionSelect={handleQuestionSelect}
            onEndReview={handleEndReview}
          />
        ) : (
          <MainContent
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={answers[currentQuestion.id]}
          />
        )}
      </main>
      {!showReviewScreen && (
        <Footer
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFlag={() => handleFlagQuestion(currentQuestion.id)}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === examData.questions.length - 1}
          isFlagged={flaggedQuestions.includes(currentQuestion.id)}
        />
      )}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Confirm Submission</h2>
            <p className="text-gray-700 mb-6">You have selected to end the exam. Are you sure you wish to submit your answers and exit the exam?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirmationModal(false)} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition-colors">
                No, Return to Review
              </button>
              <button onClick={handleConfirmEndExam} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Yes, End Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}