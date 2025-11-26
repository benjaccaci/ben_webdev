export type Question = {
  _id: string;
  quizId: string;

  type: "MultipleChoice";

  title: string;
  points: number;
  text: string;

  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
};
