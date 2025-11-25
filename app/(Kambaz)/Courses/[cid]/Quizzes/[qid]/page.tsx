/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import * as client from "../../../client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../reducer";
import Link from "next/link";

export default function QuizDetails() {
  const { cid } = useParams();
  const { qid } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>({});

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz({ ...data, id: data._id });
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatBoolean = (value: boolean) => (value ? "Yes" : "No");

  const togglePublish = async (quiz: any) => {
    const newStatus = quiz.status === "Published" ? "Unpublished" : "Published";
    const updated = { ...quiz, status: newStatus };

    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    setQuiz(updated);
  };

  return (
    <div id="wd-quiz-details" className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">{quiz.title}</h2>
        <div className="d-flex gap-2">
          <Button
            variant="light"
            className="border"
            onClick={() => togglePublish(quiz)}
          >
            {quiz.status === "Published" ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="light" className="border">
            <Link
              href={`/Courses/${cid}/Quizzes/${quiz._id}/edit`}
              className="text-black text-decoration-none"
            >
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="border rounded p-4">
        <Table borderless className="small w-auto">
          <tbody>
            <tr>
              <th className="pe-5 text-end">Quiz Type</th>
              <td>{quiz.quizType}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Points</th>
              <td>{quiz.points}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Assignment Group</th>
              <td>{quiz.assignmentGroup}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Status</th>
              <td>{quiz.status}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Shuffle Answers</th>
              <td>{formatBoolean(quiz.shuffleAnswers)}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Time Limit</th>
              <td>{quiz.timeLimitMinutes} Minutes</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Multiple Attempts</th>
              <td>{formatBoolean(quiz.multipleAttempts)}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">View Responses</th>
              <td>Always</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Show Correct Answers</th>
              <td>{formatBoolean(quiz.showCorrectAnswers)}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">One Question at a Time</th>
              <td>{formatBoolean(quiz.showOneQuestionAtATime)}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Require LockDown Browser</th>
              <td>No</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Webcam Required</th>
              <td>{formatBoolean(quiz.webcamRequired)}</td>
            </tr>
            <tr>
              <th className="pe-5 text-end">Lock Questions After Answering</th>
              <td>{formatBoolean(quiz.lockQuestionsAfterAnswering)}</td>
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
