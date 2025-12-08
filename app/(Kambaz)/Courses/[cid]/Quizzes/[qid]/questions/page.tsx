/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, Badge, Nav } from "react-bootstrap";
import { FaPlus, FaTrash, FaPencilAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import * as client from "../../../../client";
import { Question, QuestionType } from "./data";
import { Quiz } from "../../data";

export default function QuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

  // Used for refreshing after any changes are made to the Qs
  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz({
      ...data,
      questionArray: Array.isArray(data.questionArray)
        ? data.questionArray
        : [],
    });
  };

  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);

  // Less ugly than UUID but might technically fail if 100+ choices
  const generateId = () => (Math.random() * 100).toString();

  // Create a new question based on type - default values based on the assignment google doc
  const createNewQuestion = (type: QuestionType): Question => {
    const base = {
      _id: "",
      title: "New Question",
      points: 5,
      text: "Question text",
    };

    switch (type) {
      case "TrueFalse":
        return { ...base, type: "TrueFalse", correctAnswer: true };
      case "FillInTheBlank":
        return { ...base, type: "FillInTheBlank", blanks: [""] };
      case "MultipleChoice":
      default:
        return {
          ...base,
          type: "MultipleChoice",
          choices: [
            { id: generateId(), text: "Choice A", isCorrect: true },
            { id: generateId(), text: "Choice B", isCorrect: false },
          ],
        };
    }
  };

  const handleNewQuestion = () => {
    setEditingQuestion(createNewQuestion("MultipleChoice"));
    setIsNewQuestion(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsNewQuestion(false);
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setIsNewQuestion(false);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion || !quiz) return;

    // Not sure if I need to differentiate between new + existing Qs
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
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!quiz) return;
    const confirmed = window.confirm("Delete this question?");
    if (!confirmed) return;

    await client.deleteQuestion(quiz._id, questionId);
    await fetchQuiz();
  };

  // Update a field on the editing question
  const updateEditingQuestion = (field: string, value: any) => {
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [field]: value } as Question);
  };

  // Handle type change - need to TEST this. Do all existing fields get retained?
  const handleTypeChange = (newType: QuestionType) => {
    if (!editingQuestion) return;

    const base = {
      _id: editingQuestion._id,
      title: editingQuestion.title,
      points: editingQuestion.points,
      text: editingQuestion.text,
    };

    let newQuestion: Question;
    switch (newType) {
      case "TrueFalse":
        newQuestion = { ...base, type: "TrueFalse", correctAnswer: true };
        break;
      case "FillInTheBlank":
        newQuestion = { ...base, type: "FillInTheBlank", blanks: [""] };
        break;
      case "MultipleChoice":
      default:
        newQuestion = {
          ...base,
          type: "MultipleChoice",
          choices: [
            { id: generateId(), text: "Choice A", isCorrect: true },
            { id: generateId(), text: "Choice B", isCorrect: false },
          ],
        };
    }
    setEditingQuestion(newQuestion);
  };

  // MC specific handler
  // QUESTION: Figure out if there's a way to prevent other Q types from using this
  const updateChoice = (choiceId: string, text: string) => {
    // ANSWER: is the type guard needed
    if (!editingQuestion || editingQuestion.type !== "MultipleChoice") return;
    setEditingQuestion({
      ...editingQuestion,
      // Map through the choices, if it matches the ID then update text
      choices: editingQuestion.choices.map((c) =>
        c.id === choiceId ? { ...c, text } : c
      ),
    });
  };

  const setCorrectChoice = (choiceId: string) => {
    if (!editingQuestion || editingQuestion.type !== "MultipleChoice") return;
    setEditingQuestion({
      ...editingQuestion,
      choices: editingQuestion.choices.map((c) => ({
        ...c,
        // If the index matches the chosen Choice, then set it to correct
        isCorrect: c.id === choiceId,
      })),
    });
  };

  // Default new choice should not be the right one, that would be weird
  const addChoice = () => {
    if (!editingQuestion || editingQuestion.type !== "MultipleChoice") return;
    setEditingQuestion({
      ...editingQuestion,
      choices: [
        ...editingQuestion.choices,
        { id: generateId(), text: "", isCorrect: false },
      ],
    });
  };

  const removeChoice = (choiceId: string) => {
    if (!editingQuestion || editingQuestion.type !== "MultipleChoice") return;
    // Doesn't make sense to have less than 2 choices
    if (editingQuestion.choices.length <= 2) return;

    const newChoices = editingQuestion.choices.filter((c) => c.id !== choiceId);
    if (!newChoices.some((c) => c.isCorrect)) {
      // By default, if the correct choice was removed it makes sense to default to the first one
      newChoices[0].isCorrect = true;
    }
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  // FITB specific handlers
  const updateBlank = (index: number, value: string) => {
    if (!editingQuestion || editingQuestion.type !== "FillInTheBlank") return;
    const newBlanks = [...editingQuestion.blanks];
    // Add the new value to the blanks array at the given index
    newBlanks[index] = value;
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const addBlank = () => {
    if (!editingQuestion || editingQuestion.type !== "FillInTheBlank") return;
    setEditingQuestion({
      ...editingQuestion,
      blanks: [...editingQuestion.blanks, ""],
    });
  };

  const removeBlank = (index: number) => {
    if (!editingQuestion || editingQuestion.type !== "FillInTheBlank") return;
    // Need to have at least one possible correct blank
    if (editingQuestion.blanks.length <= 1) return;

    const newBlanks = editingQuestion.blanks.filter((_, i) => i !== index);
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  // Just a little cleaner this way
  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case "TrueFalse":
        return "True/False";
      case "FillInTheBlank":
        return "Fill in the Blank";
      case "MultipleChoice":
      default:
        return "Multiple Choice";
    }
  };

  // Show the question based on the Q type, don't think should be editable
  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "TrueFalse":
        return (
          <div className="small">
            <div
              className={question.correctAnswer ? "text-success fw-bold" : ""}
            >
              True
            </div>
            <div
              className={!question.correctAnswer ? "text-success fw-bold" : ""}
            >
              False
            </div>
          </div>
        );
      case "FillInTheBlank":
        return (
          <div className="small">
            <span className="text-muted">Correct answers: </span>
            {(question.blanks || []).map((blank, i) => (
              <span key={i} className="me-2 text-success fw-bold">
                {blank}
              </span>
            ))}
          </div>
        );
      case "MultipleChoice":
      default:
        return (
          <div className="small">
            {(question.choices || []).map((choice) => (
              <div
                key={choice.id}
                className={choice.isCorrect ? "text-success fw-bold" : ""}
              >
                {choice.text || "(empty)"}
              </div>
            ))}
          </div>
        );
    }
  };

  // Render the Q editor based on the specific Q type
  const renderQuestionEditor = () => {
    if (!editingQuestion) return null;

    switch (editingQuestion.type) {
      case "TrueFalse":
        return (
          <Form.Group className="mb-4">
            <Form.Label>
              <p className="fw-bold"> Answers:</p>
            </Form.Label>
            <div className="d-flex flex-column gap-2">
              {/* Assignment specifies that T/F must be radios */}
              <Form.Check
                type="radio"
                id="true-option"
                name="trueFalseAnswer"
                label={
                  <span
                    className={
                      editingQuestion.correctAnswer
                        ? "text-success fw-bold"
                        : ""
                    }
                  >
                    True
                  </span>
                }
                checked={editingQuestion.correctAnswer === true}
                onChange={() => updateEditingQuestion("correctAnswer", true)}
              />
              <Form.Check
                type="radio"
                id="false-option"
                name="trueFalseAnswer"
                label={
                  <span
                    className={
                      !editingQuestion.correctAnswer
                        ? "text-success fw-bold"
                        : ""
                    }
                  >
                    False
                  </span>
                }
                checked={editingQuestion.correctAnswer === false}
                onChange={() => updateEditingQuestion("correctAnswer", false)}
              />
            </div>
          </Form.Group>
        );

      case "FillInTheBlank":
        return (
          <Form.Group className="mb-4">
            <Form.Label>
              <p className="fw-bold">Possible Correct Answers:</p>
            </Form.Label>
            <p className="text-muted small">
              Enter all possible correct answers.
            </p>
            {editingQuestion.blanks.map((blank, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mb-2">
                <span className="text-muted small" style={{ width: "160px" }}>
                  Possible Answer:
                </span>
                {/* All options should be editable */}
                <Form.Control
                  type="text"
                  value={blank}
                  onChange={(e) => updateBlank(index, e.target.value)}
                  placeholder="Enter possible answer..."
                  className="flex-grow-1"
                />
                {/* Give the user ability to delete an option */}
                {editingQuestion.blanks.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeBlank(index)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="link"
              className="text-danger p-0 mt-2"
              onClick={addBlank}
            >
              + Add Another Answer
            </Button>
          </Form.Group>
        );

      case "MultipleChoice":
      default:
        return (
          <Form.Group className="mb-4">
            <Form.Label>
              <p className="fg-bold">Answers:</p>
            </Form.Label>
            {editingQuestion.choices.map((choice) => (
              <div
                key={choice.id}
                className="d-flex align-items-center gap-2 mb-2"
              >
                {/* I think using radios here is the easiest solution ? */}
                <Form.Check
                  type="radio"
                  name="correctAnswer"
                  checked={choice.isCorrect}
                  onChange={() => setCorrectChoice(choice.id)}
                  title="Mark as correct answer"
                />
                <span className={"text-muted"} style={{ width: "100px" }}>
                  {"Possible Answer"}
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
        );
    }
  };

  const questionArray = quiz?.questionArray || [];
  const totalPoints = questionArray.reduce(
    (sum, q) => sum + (q.points || 0),
    0
  );

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-4">
      {/* Nav tabs to the other quiz editor pages (Details, Preview) */}
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
            <Nav.Link active>Questions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)
              }
              style={{ cursor: "pointer" }}
            >
              Preview
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="d-flex text-muted">
          Points: <p className="fg-bold">{totalPoints}</p>
        </div>
      </div>

      {/* Questions List, should start empty */}
      {!editingQuestion && (
        <>
          <div className="mb-3">
            <Button variant="outline-danger" onClick={handleNewQuestion}>
              <FaPlus className="me-2" /> New Question
            </Button>
          </div>

          {questionArray.length === 0 && (
            <div className="text-muted text-center py-5 border rounded">
              No questions yet.
            </div>
          )}

          {questionArray.map((question, index) => (
            <Card key={question._id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <p className="fg-bold">
                        Q{index + 1}: {question.title || "No title for Q"}
                      </p>
                    </div>
                    <p className="text-muted mb-2">
                      {question.text || "No question text"}
                    </p>
                    {renderQuestionPreview(question)}
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      // Instead of handling this directly, give to the helper function
                      onClick={() => handleEditQuestion(question)}
                    >
                      <FaPencilAlt />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      // Same idea
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

      {/* If you're editing a question, show this! */}
      {editingQuestion && (
        <Card className="border-danger">
          <Card.Header className="bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <Form.Control
                  type="text"
                  value={editingQuestion.title || ""}
                  onChange={(e) =>
                    updateEditingQuestion("title", e.target.value)
                  }
                  style={{ width: "200px" }}
                  placeholder="Question Title"
                />
                {/* Does changing the Q type after adding data cause an issue? */}
                {/* TO-DO: Test that */}
                <Form.Select
                  value={editingQuestion.type}
                  onChange={(e) =>
                    handleTypeChange(e.target.value as QuestionType)
                  }
                  style={{ width: "180px" }}
                >
                  <option value="MultipleChoice">Multiple Choice</option>
                  <option value="TrueFalse">True/False</option>
                  <option value="FillInTheBlank">Fill in the Blank</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>pts:</span>
                <Form.Control
                  type="number"
                  value={editingQuestion.points ?? 0}
                  onChange={(e) =>
                    updateEditingQuestion("points", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-4">
              <Form.Label>
                <p className="fg-bold">Question:</p>
              </Form.Label>
              {/* All 3 Q types need an actual text field for the Q itself, almost forgot */}
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.text || ""}
                onChange={(e) => updateEditingQuestion("text", e.target.value)}
                placeholder="Enter question text..."
              />
            </Form.Group>

            {renderQuestionEditor()}

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

      {/* Bottom navigation, under the Q editing - for saving the progress */}
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
