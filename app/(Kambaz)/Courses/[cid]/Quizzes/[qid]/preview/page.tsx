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

  // Get the quiz from the backend and load it
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

    // Depends on the Q type
    switch (question.type) {
      case "MultipleChoice": {
        const correctChoice = question.choices.find((c) => c.isCorrect);
        return correctChoice?.id === userAnswer;
      }
      case "TrueFalse": {
        return question.correctAnswer === userAnswer;
      }
      case "FillInTheBlank": {
        // Case insensitive, so make sure to lowercase
        const userAnswerLower = String(userAnswer).toLowerCase().trim();
        return question.blanks.some(
          (blank) => blank.toLowerCase().trim() === userAnswerLower
        );
      }
      default:
        return false;
    }
  };

  // Calculate the total score (all Qs added up)
  const calculateScore = (): number => {
    if (!quiz) return 0;
    let totalScore = 0;
    quiz.questionArray.forEach((question) => {
      // Use the answer checking function here
      if (isAnswerCorrect(question, userAnswers[question._id])) {
        totalScore += question.points;
      }
    });
    return totalScore;
  };

  // When the user changes the answer, update the Question object
  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit the quiz (do I need all Qs to be answered?)
  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    // In Canvas, the quiz will go back to the first question after submit
    setCurrentQuestionIndex(0);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  // These navigation functions are pretty self-explanatory
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
    // This is NOT good code, but I think it should account for all 3 Qs
    const hasAnswered =
      userAnswer !== undefined && userAnswer !== null && userAnswer !== "";

    return (
      <Card
        // If submitted, show the right/wrong color
        className={`mb-4 ${
          submitted ? (isCorrect ? "border-success" : "border-danger") : ""
        }`}
      >
        {/*Also show a right/wrong icon*/}
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

          {/*For MC, map all of the options in a list*/}
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
                  // Make sure to change the answer after any new selection
                  onChange={() => handleAnswerChange(question._id, choice.id)}
                  disabled={submitted}
                />
              ))}
            </div>
          )}

          {/*For T/F, the assignment specifies that they have to be radios*/}
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

          {/*For Fill in the Blank, just show a text box that they can use*/}
          {question.type === "FillInTheBlank" && (
            <div>
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={(userAnswer as string) || ""}
                onChange={(e) =>
                  // Is this different from other handleChange
                  // TO-DO: Find out
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
              {/*Not sure if this is necessary, but is nice to have*/}
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
              <small>Correct</small>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  // Question array is taken from the quiz data type
  const questionArray = quiz?.questionArray || [];
  const totalPoints = questionArray.reduce(
    (sum, q) => sum + (q.points || 0),
    0
  );
  const currentQuestion = questionArray[currentQuestionIndex];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-4">
      {/* Header with links to the other quiz editor pages (Details, Edit) */}
      {/* Still not ENTIRELY sure if the preview is at the same level/spot as those */}
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

      {/* A preview banner to match the Canvas screenshot in google doc */}
      <Alert variant="danger" className="d-flex align-items-center gap-2">
        <span>This is a preview of your quiz. </span>
      </Alert>

      {/* Score Summary - IMPORTANT that it is only after submission */}
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
        </Alert>
      )}

      {/* Edge case where there are no questions, might be needed */}
      {questionArray.length === 0 ? (
        <Alert variant="info">This quiz has no questions yet.</Alert>
      ) : (
        <>
          {/* Current Question */}
          {currentQuestion &&
            renderQuestion(currentQuestion, currentQuestionIndex)}

          {/* Navigation between Qs, should work ? */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button
              variant="outline-secondary"
              onClick={goToPrevious}
              // Current design is to disable edge buttons, but maybe should loop around?
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

      {/* Quiz Footer with the submission stuff */}
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

      {/* Keep Editing Button - required in assignment google doc */}
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
