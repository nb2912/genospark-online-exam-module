import React from 'react';

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onFlag: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isFlagged: boolean;
}

const Footer: React.FC<Props> = ({ onNext, onPrevious, onFlag, isFirstQuestion, isLastQuestion, isFlagged }) => {
  return (
    <footer className="bg-linear-to-r from-blue-700 to-blue-900 p-4 fixed bottom-0 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <button
            onClick={onFlag}
            className={`${
              isFlagged ? 'bg-orange-600 hover:bg-orange-700' : 'bg-amber-500 hover:bg-amber-600'
            } text-white font-bold py-2 px-4 rounded transition-colors`}
          >
            {isFlagged ? 'Unflag' : 'Flag for Review'}
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className={`${
              isLastQuestion 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white font-bold py-2 px-4 rounded transition-colors`}
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
