/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, Badge } from "react-bootstrap";
import { FaPlus, FaTrash, FaPencilAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import * as client from "../../../../client";

type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  type: "MultipleChoice";
  title: string;
  points: number;
  text: string;
  choices: Choice[];
};

type Quiz = {
  _id: string;
  title: string;
  points: number;
  questions: number;
  questionArray: Question[];
};

export default function QuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz(data);
  };

  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleNewQuestion = () => {
    const newQuestion: Question = {
      _id: "",
      type: "MultipleChoice",
      title: "New Question",
      points: 5,
      text: "Question text",
      choices: [
        { id: generateId(), text: "Choice A", isCorrect: true },
        { id: generateId(), text: "Choice B", isCorrect: false },
      ],
    };
    setEditingQuestion(newQuestion);
    setIsNewQuestion(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({
      ...question,
      choices: question.choices.map((c) => ({ ...c })),
    });
    setIsNewQuestion(false);
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setIsNewQuestion(false);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion || !quiz) return;

    try {
      if (isNewQuestion) {
        await client.addQuestionToQuiz(quiz._id, editingQuestion);
      } else {
        await client.updateQuestion(
          quiz._id,
          editingQuestion._id,
          editingQuestion
        );
      }
      await fetchQuiz();
      setEditingQuestion(null);
      setIsNewQuestion(false);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!quiz) return;
    const confirmed = window.confirm("Delete this question?");
    if (!confirmed) return;

    try {
      await client.deleteQuestion(quiz._id, questionId);
      await fetchQuiz();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const updateEditingQuestion = (field: string, value: any) => {
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  const updateChoice = (choiceId: string, text: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      choices: editingQuestion.choices.map((c) =>
        c.id === choiceId ? { ...c, text } : c
      ),
    });
  };

  const setCorrectChoice = (choiceId: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      choices: editingQuestion.choices.map((c) => ({
        ...c,
        isCorrect: c.id === choiceId,
      })),
    });
  };

  const addChoice = () => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      choices: [
        ...editingQuestion.choices,
        { id: generateId(), text: "", isCorrect: false },
      ],
    });
  };

  const removeChoice = (choiceId: string) => {
    if (!editingQuestion || editingQuestion.choices.length <= 2) return;
    const newChoices = editingQuestion.choices.filter((c) => c.id !== choiceId);
    if (!newChoices.some((c) => c.isCorrect)) {
      newChoices[0].isCorrect = true;
    }
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const totalPoints =
    quiz?.questionArray?.reduce((sum, q) => sum + q.points, 0) || 0;

  if (!quiz) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <Link href={`/Courses/${cid}/Quizzes/${qid}/edit`}>
            <Button variant="outline-secondary">Details</Button>
          </Link>
          <Button variant="secondary" disabled>
            Questions
          </Button>
        </div>
        <div className="text-muted">
          Points: <strong>{totalPoints}</strong>
        </div>
      </div>

      {!editingQuestion && (
        <>
          <div className="mb-3">
            <Button variant="outline-danger" onClick={handleNewQuestion}>
              <FaPlus className="me-2" /> New Question
            </Button>
          </div>

          {quiz.questionArray?.length === 0 && (
            <div className="text-muted text-center py-5 border rounded">
              No questions yet.
            </div>
          )}

          {quiz.questionArray?.map((question, index) => (
            <Card key={question._id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <strong>
                        Q{index + 1}: {question.title}
                      </strong>
                      <Badge bg="secondary">{question.type}</Badge>
                      <Badge bg="info">{question.points} pts</Badge>
                    </div>
                    <p className="text-muted mb-2">{question.text}</p>
                    <div className="small">
                      {question.choices.map((choice) => (
                        <div
                          key={choice.id}
                          className={
                            choice.isCorrect ? "text-success fw-bold" : ""
                          }
                        >
                          {choice.isCorrect ? "✓ " : "○ "}
                          {choice.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <FaPencilAlt />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {editingQuestion && (
        <Card className="border-danger">
          <Card.Header className="bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <Form.Control
                  type="text"
                  value={editingQuestion.title}
                  onChange={(e) =>
                    updateEditingQuestion("title", e.target.value)
                  }
                  style={{ width: "200px" }}
                  placeholder="Question Title"
                />
                <Form.Select
                  value={editingQuestion.type}
                  onChange={(e) =>
                    updateEditingQuestion("type", e.target.value)
                  }
                  style={{ width: "150px" }}
                >
                  <option value="MultipleChoice">Multiple Choice</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>pts:</span>
                <Form.Control
                  type="number"
                  value={editingQuestion.points}
                  onChange={(e) =>
                    updateEditingQuestion(
                      "points",
                      parseInt(e.target.value) || 0
                    )
                  }
                  style={{ width: "70px" }}
                  min={0}
                />
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <p className="text-muted small mb-3">
              Enter your question and multiple answers, then select the one
              correct answer.
            </p>

            <Form.Group className="mb-4">
              <Form.Label>
                <strong>Question:</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.text}
                onChange={(e) => updateEditingQuestion("text", e.target.value)}
                placeholder="Enter question text..."
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                <strong>Answers:</strong>
              </Form.Label>
              {editingQuestion.choices.map((choice) => (
                <div
                  key={choice.id}
                  className="d-flex align-items-center gap-2 mb-2"
                >
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    checked={choice.isCorrect}
                    onChange={() => setCorrectChoice(choice.id)}
                    title="Mark as correct answer"
                  />
                  <span
                    className={`small ${
                      choice.isCorrect ? "text-success fw-bold" : "text-muted"
                    }`}
                  >
                    {choice.isCorrect ? "Correct Answer" : "Possible Answer"}
                  </span>
                  <Form.Control
                    type="text"
                    value={choice.text}
                    onChange={(e) => updateChoice(choice.id, e.target.value)}
                    placeholder="Enter answer..."
                    className="flex-grow-1"
                  />
                  {editingQuestion.choices.length > 2 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeChoice(choice.id)}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="link"
                className="text-danger p-0 mt-2"
                onClick={addChoice}
              >
                + Add Another Answer
              </Button>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSaveQuestion}>
                {isNewQuestion ? "Save Question" : "Update Question"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <div className="d-flex justify-content-between mt-4 pt-3 border-top">
        <Button
          variant="outline-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          Done <FaArrowRight className="ms-2" />
        </Button>
      </div>
    </div>
  );
}
