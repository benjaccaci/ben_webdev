export type QuestionType = "MultipleChoice" | "TrueFalse" | "FillInTheBlank";

export type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

// Trying the interface approach from OOD (not sure if it works the same in TypeScript)
interface BaseQuestion {
  _id: string;
  quizId?: string;
  title: string;
  points: number;
  text: string;
}

// Multiple Choice Qs
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "MultipleChoice";
  choices: Choice[];
}

// True/False Qs
export interface TrueFalseQuestion extends BaseQuestion {
  type: "TrueFalse";
  correctAnswer: boolean;
}

// Fill in the Blank Qs
export interface FillInTheBlankQuestion extends BaseQuestion {
  type: "FillInTheBlank";
  blanks: string[];
}

// Union type for 3 Qs
export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion;
