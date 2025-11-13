export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  correctAnswer: string;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
}

export interface Exam {
  id: string;
  title: string;
  questions: Question[];
}
