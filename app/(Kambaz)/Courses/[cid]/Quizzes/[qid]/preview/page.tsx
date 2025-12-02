/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert, Nav } from "react-bootstrap";
import {
  FaPencilAlt,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import * as client from "../../../../client";
import { Question } from "../questions/data";

type Quiz = {
  _id: string;
  title: string;
  description: string;
  points: number;
  questions: number;
  timeLimitMinutes: number;
  questionArray: Question[];
};

type UserAnswers = {
  [questionId: string]: string | boolean;
};

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(new Date());

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await client.findQuizById(qid as string);
      setQuiz({
        ...data,
        questionArray: Array.isArray(data.questionArray)
          ? data.questionArray
          : [],
      });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);

  // Check if an answer is correct
  const isAnswerCorrect = (question: Question, userAnswer: any): boolean => {
    if (userAnswer === undefined || userAnswer === null) return false;

    switch (question.type) {
      case "MultipleChoice": {
        const correctChoice = question.choices.find((c) => c.isCorrect);
        return correctChoice?.id === userAnswer;
      }
      case "TrueFalse": {
        return question.correctAnswer === userAnswer;
      }
      case "FillInTheBlank": {
        const userAnswerLower = String(userAnswer).toLowerCase().trim();
        return question.blanks.some(
          (blank) => blank.toLowerCase().trim() === userAnswerLower
        );
      }
      default:
        return false;
    }
  };

  // Calculate total score
  const calculateScore = (): number => {
    if (!quiz) return 0;
    let totalScore = 0;
    quiz.questionArray.forEach((question) => {
      if (isAnswerCorrect(question, userAnswers[question._id])) {
        totalScore += question.points;
      }
    });
    return totalScore;
  };

  // Handle answer selection
  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit the quiz
  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    setCurrentQuestionIndex(0); // Reset to first question to review
  };

  // Reset the quiz
  const handleRetake = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  // Navigation
  const goToNext = () => {
    if (currentQuestionIndex < questionArray.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Render a single question
  const renderQuestion = (question: Question, index: number) => {
    const userAnswer = userAnswers[question._id];
    const isCorrect = submitted ? isAnswerCorrect(question, userAnswer) : null;
    const hasAnswered =
      userAnswer !== undefined && userAnswer !== null && userAnswer !== "";

    return (
      <Card
        className={`mb-4 ${
          submitted ? (isCorrect ? "border-success" : "border-danger") : ""
        }`}
      >
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div className="d-flex align-items-center gap-2">
            {submitted &&
              (isCorrect ? (
                <FaCheck className="text-success" />
              ) : (
                <FaTimes className="text-danger" />
              ))}
            <strong>Question {index + 1}</strong>
          </div>
          <span>{question.points} pts</span>
        </Card.Header>
        <Card.Body>
          <p className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
            {question.text}
          </p>

          {question.type === "MultipleChoice" && (
            <div className="d-flex flex-column gap-2">
              {question.choices.map((choice) => (
                <Form.Check
                  key={choice.id}
                  type="radio"
                  id={`${question._id}-${choice.id}`}
                  name={question._id}
                  label={
                    <span
                      className={
                        submitted
                          ? choice.isCorrect
                            ? "text-success fw-bold"
                            : userAnswer === choice.id
                            ? "text-danger"
                            : ""
                          : ""
                      }
                    >
                      {choice.text}
                      {submitted && choice.isCorrect && " ✓"}
                    </span>
                  }
                  checked={userAnswer === choice.id}
                  onChange={() => handleAnswerChange(question._id, choice.id)}
                  disabled={submitted}
                />
              ))}
            </div>
          )}

          {question.type === "TrueFalse" && (
            <div className="d-flex flex-column gap-2">
              <Form.Check
                type="radio"
                id={`${question._id}-true`}
                name={question._id}
                label={
                  <span
                    className={
                      submitted
                        ? question.correctAnswer === true
                          ? "text-success fw-bold"
                          : userAnswer === true
                          ? "text-danger"
                          : ""
                        : ""
                    }
                  >
                    True
                    {submitted && question.correctAnswer === true && " ✓"}
                  </span>
                }
                checked={userAnswer === true}
                onChange={() => handleAnswerChange(question._id, true)}
                disabled={submitted}
              />
              <Form.Check
                type="radio"
                id={`${question._id}-false`}
                name={question._id}
                label={
                  <span
                    className={
                      submitted
                        ? question.correctAnswer === false
                          ? "text-success fw-bold"
                          : userAnswer === false
                          ? "text-danger"
                          : ""
                        : ""
                    }
                  >
                    False
                    {submitted && question.correctAnswer === false && " ✓"}
                  </span>
                }
                checked={userAnswer === false}
                onChange={() => handleAnswerChange(question._id, false)}
                disabled={submitted}
              />
            </div>
          )}

          {question.type === "FillInTheBlank" && (
            <div>
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={(userAnswer as string) || ""}
                onChange={(e) =>
                  handleAnswerChange(question._id, e.target.value)
                }
                disabled={submitted}
                className={
                  submitted
                    ? isCorrect
                      ? "border-success"
                      : "border-danger"
                    : ""
                }
              />
              {submitted && !isCorrect && (
                <div className="mt-2 text-success small">
                  <strong>Correct answer(s):</strong>{" "}
                  {question.blanks.join(", ")}
                </div>
              )}
            </div>
          )}

          {submitted && !isCorrect && (
            <Alert variant="danger" className="mt-3 mb-0 py-2">
              <small>Incorrect</small>
            </Alert>
          )}
          {submitted && isCorrect && (
            <Alert variant="success" className="mt-3 mb-0 py-2">
              <small>Correct!</small>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  const questionArray = quiz?.questionArray || [];
  const totalPoints = questionArray.reduce(
    (sum, q) => sum + (q.points || 0),
    0
  );
  const answeredCount = Object.keys(userAnswers).filter(
    (key) => userAnswers[key] !== undefined && userAnswers[key] !== ""
  ).length;
  const currentQuestion = questionArray[currentQuestionIndex];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-4">
      {/* Header with tabs */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
              style={{ cursor: "pointer" }}
            >
              Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/questions`)
              }
              style={{ cursor: "pointer" }}
            >
              Questions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active>Preview</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* Preview Banner */}
      <Alert variant="danger" className="d-flex align-items-center gap-2">
        <span>This is a preview of your quiz. </span>
      </Alert>

      {/* Score Summary (after submission) */}
      {submitted && (
        <Alert
          variant={score === totalPoints ? "success" : "warning"}
          className="mb-4"
        >
          <h5 className="mb-2">Quiz Completed!</h5>
          <p className="mb-1">
            <strong>Your Score:</strong> {score} / {totalPoints} points (
            {totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0}%)
          </p>
          <p className="mb-0">
            <strong>Questions Correct:</strong>{" "}
            {
              questionArray.filter((q) =>
                isAnswerCorrect(q, userAnswers[q._id])
              ).length
            }{" "}
            / {questionArray.length}
          </p>
        </Alert>
      )}

      {/* Questions */}
      {questionArray.length === 0 ? (
        <Alert variant="info">This quiz has no questions yet.</Alert>
      ) : (
        <>
          {/* Current Question */}
          {currentQuestion &&
            renderQuestion(currentQuestion, currentQuestionIndex)}

          {/* Navigation between Qs */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button
              variant="outline-secondary"
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
            >
              <FaArrowLeft className="me-2" /> Previous
            </Button>
            <Button
              variant="outline-secondary"
              onClick={goToNext}
              disabled={currentQuestionIndex === questionArray.length - 1}
            >
              Next <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </>
      )}

      {/* Quiz Footer */}
      {questionArray.length > 0 && (
        <Card className="mt-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            {!submitted ? (
              <>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="outline-secondary" onClick={handleSubmit}>
                    Submit Quiz
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>
                  <strong>Final Score:</strong> {score} / {totalPoints}
                </span>
                <Button variant="outline-primary" onClick={handleRetake}>
                  Retake Quiz
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Keep Editing Button */}
      <div className="mt-4 pt-3 border-top">
        <Button
          variant="link"
          className="text-muted p-0 d-flex align-items-center gap-2"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/questions`)
          }
        >
          <FaPencilAlt /> Keep Editing This Quiz
        </Button>
      </div>
    </div>
  );
}
