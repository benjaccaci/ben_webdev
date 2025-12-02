import { Question } from "./[qid]/questions/data";

// Dummy quiz type, actual site uses the backend data type
// Not sure if I need to keep this after connecting to NodeJS

export type Quiz = {
  _id: string;
  title: string;
  description: string;
  status: string;
  availability: string;
  points: number;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  multipleAttempts: boolean;
  showOneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  showCorrectAnswers: string;
  accessCode?: string;
  questions: number;
  timeLimitMinutes: number;
  availableFrom: string | Date;
  availableUntil: string | Date;
  questionArray: Question[];
};
