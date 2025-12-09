export type QuestionType = 'single' | 'multiple' | 'short' | 'dropdown' | 'truefalse';

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  text: string;
  image?: string;
  answers?: Answer[];
}
