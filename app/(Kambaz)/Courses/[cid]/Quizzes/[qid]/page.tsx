"use client";

import { useParams } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import { quizzes } from "../data";

export default function QuizDetails() {
  const { qid } = useParams();
  const quiz = quizzes.find((item) => item.id === qid) || quizzes[0];

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div id="wd-quiz-details" className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">{quiz.title}</h2>
        <div className="d-flex gap-2">
          <Button variant="light" className="border">
            Publish
          </Button>
          <Button variant="secondary">Edit</Button>
        </div>
      </div>

      <div className="border rounded p-4">
        <Table borderless className="small w-auto">
          <tbody>
            <tr>
              <th className="pe-5 text-end">Quiz Type</th>
              <td>Graded Quiz</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Points</th>
              <td>{quiz.points}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Assignment Group</th>
              <td>QUIZZES</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Status</th>
              <td>{quiz.status}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Shuffle Answers</th>
              <td>No</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Time Limit</th>
              <td>{quiz.timeLimitMinutes} Minutes</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Multiple Attempts</th>
              <td>No</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">View Responses</th>
              <td>Always</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Show Correct Answers</th>
              <td>Immediately</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">One Question at a Time</th>
              <td>Yes</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">
                Require Respondus LockDown Browser
              </th>
              <td>No</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Webcam Required</th>
              <td>No</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Lock Questions After Answering</th>
              <td>No</td>
            </tr>
          </tbody>
        </Table>

        <Table bordered size="sm" className="mt-4 small">
          <thead>
            <tr className="bg-light">
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(new Date(quiz.availableUntil))}</td>
              <td>Everyone</td>
              <td>{formatDate(new Date(quiz.availableFrom))}</td>
              <td>{formatDate(new Date(quiz.availableUntil))}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
