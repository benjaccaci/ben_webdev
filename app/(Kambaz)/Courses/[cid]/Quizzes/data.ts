export type Quiz = {
  id: string;
  title: string;
  status: string;
  points: number;
  questions: number;
  timeLimitMinutes: number;
  availableFrom: string;
  availableUntil: string;
};

export const quizzes: Quiz[] = [
  {
    id: "Q1",
    title: "Q1 - HTML",
    status: "available",
    points: 29,
    questions: 30,
    timeLimitMinutes: 20,
    availableFrom: "Sep 10 at 12:00am",
    availableUntil: "Sep 17 at 11:59pm",
  },
  {
    id: "exam2",
    title: "EXAM 2 FA23",
    status: "closed",
    points: 210,
    questions: 50,
    timeLimitMinutes: 60,
    availableFrom: "Closed on Tue Nov 21 at 3:00pm",
    availableUntil: "Sat Dec 15 at 5:00pm",
  },
];
