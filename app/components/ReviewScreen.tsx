import React from 'react';
import { Question } from '../types/types';

interface Props {
  questions: Question[];
  answers: Record<number, string>;
  flaggedQuestions: number[];
  onQuestionSelect: (questionIndex: number) => void;
  onEndReview: () => void;
}

const ReviewScreen: React.FC<Props> = ({ questions, answers, flaggedQuestions, onQuestionSelect, onEndReview }) => {
  return (
    <div className="container mx-auto p-6 pb-32">
      <h1 className="text-3xl font-bold mb-2 text-blue-900">Item Review</h1>
      <p className="text-gray-600 mb-6">Review all questions before submitting your exam</p>
      <div className="grid grid-cols-10 gap-2 mb-8 p-4 bg-white rounded-lg shadow-md">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(index)}
            className={`p-3 border-2 rounded font-semibold transition-all ${
              answers[question.id] 
                ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            } ${flaggedQuestions.includes(question.id) ? 'ring-2 ring-amber-400' : ''}`}
          >
            {question.id}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
            <span className="text-gray-700">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
            <span className="text-gray-700">Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ring-2 ring-amber-400 rounded"></div>
            <span className="text-gray-700">Flagged</span>
          </div>
        </div>
        <button onClick={onEndReview} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors">
          End Review
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;
