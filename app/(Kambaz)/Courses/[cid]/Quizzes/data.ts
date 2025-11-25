export type Quiz = {
  id: string;
  title: string;
  status: string;
  availability: string;
  points: number;
  questions: number;
  timeLimitMinutes: number;
  availableFrom: Date;
  availableUntil: Date;
};

export const quizzes: Quiz[] = [
  {
    id: "Q1",
    title: "Q1 - HTML",
    status: "Published",
    availability: "Available",
    points: 29,
    questions: 30,
    timeLimitMinutes: 20,
    availableFrom: new Date("2025-12-23"),
    availableUntil: new Date("2025-12-30"),
  },
  {
    id: "Q2",
    title: "Q2 - CSS",
    status: "Published",
    availability: "Closed",
    points: 20,
    questions: 10,
    timeLimitMinutes: 45,
    availableFrom: new Date("2025-10-23"),
    availableUntil: new Date("2025-10-23"),
  },
  {
    id: "exam2",
    title: "EXAM 2 FA23",
    status: "Unpublished",
    availability: "Closed",
    points: 210,
    questions: 50,
    timeLimitMinutes: 60,
    availableFrom: new Date("2025-11-23"),
    availableUntil: new Date("2025-11-23"),
  },
];
