import React from 'react';
import { Question } from '../types/types';

interface Props {
  question: Question;
  onAnswerSelect: (questionId: number, answerId: string) => void;
  selectedAnswer?: string;
}

const MainContent: React.FC<Props> = ({ question, onAnswerSelect, selectedAnswer }) => {
  return (
    <main className="container mx-auto p-6 pb-32">
      <div className="text-center mb-8">
        <p className="text-lg font-semibold text-blue-700">Question {question.id} of 60</p>
      </div>
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
        <p className="text-xl font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: question.text }}></p>
      </div>
      <div className="space-y-4">
        {question.answers.map((answer) => (
          <div key={answer.id} className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
            <input
              id={answer.id}
              type="radio"
              name={`answer-${question.id}`}
              className="w-5 h-5 text-blue-700 bg-gray-100 border-blue-300 focus:ring-blue-500 mt-1 cursor-pointer"
              onChange={() => onAnswerSelect(question.id, answer.id)}
              checked={selectedAnswer === answer.id}
            />
            <label htmlFor={answer.id} className="ml-3 text-lg text-gray-700 cursor-pointer flex-1">
              {answer.text}
            </label>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
