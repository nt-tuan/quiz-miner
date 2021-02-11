export interface Answer {
  id: string;
  name: string;
  value: string;
  content: string;
  isCorrect: boolean;
}
export interface Question {
  content: string;
  id: string;
  answers: Answer[];
}
export interface Exam {
  questionsIds: string;
  tag: { [key: string]: string };
  title: string;
  subtitle: string;
  questions: Question[];
  attemptId: string;
  id: number;
}
