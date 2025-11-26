/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import * as client from "../../../../client";
import { useDispatch } from "react-redux";
import { updateQuiz as updateQuizRedux } from "../../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const data = await client.findQuizById(qid as string);
      setQuiz({ ...data });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);

  const updateField = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

  const save = async (publish = false) => {
    const updated = {
      ...quiz,
      status: publish ? "Published" : quiz.status,
    };

    await client.updateQuiz(updated);
    dispatch(updateQuizRedux(updated));

    if (publish) {
      router.push(`/Courses/${cid}/Quizzes`);
    } else {
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    }
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (loading) {
    return <div className="container py-3">Loading...</div>;
  }

  return (
    <div className="container py-3">
      <h2>Edit Quiz</h2>

      {/* Custom Tab Navigation */}
      <Nav variant="tabs" className="my-3">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
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
      </Nav>

      <div className="border rounded p-3">
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            value={quiz.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={quiz.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={quiz.points ?? 0}
                onChange={(e) => updateField("points", Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                value={quiz.quizType || "Graded Quiz"}
                onChange={(e) => updateField("quizType", e.target.value)}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select
                value={quiz.assignmentGroup || "Quizzes"}
                onChange={(e) => updateField("assignmentGroup", e.target.value)}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time Limit (Minutes)</Form.Label>
              <Form.Control
                type="number"
                value={quiz.timeLimitMinutes ?? 20}
                onChange={(e) =>
                  updateField("timeLimitMinutes", Number(e.target.value))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Show Correct Answers</Form.Label>
              <Form.Select
                value={quiz.showCorrectAnswers || "Immediately"}
                onChange={(e) =>
                  updateField("showCorrectAnswers", e.target.value)
                }
              >
                <option>Immediately</option>
                <option>After Due Date</option>
                <option>Never</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="shuffle-answers"
                checked={!!quiz.shuffleAnswers}
                onChange={(e) =>
                  updateField("shuffleAnswers", e.target.checked)
                }
                label="Shuffle Answers"
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="multiple-attempts"
                checked={!!quiz.multipleAttempts}
                onChange={(e) =>
                  updateField("multipleAttempts", e.target.checked)
                }
                label="Multiple Attempts"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="show-one-question-at-a-time"
                checked={!!quiz.showOneQuestionAtATime}
                onChange={(e) =>
                  updateField("showOneQuestionAtATime", e.target.checked)
                }
                label="Show One Question at a Time"
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="webcam-required"
                checked={!!quiz.webcamRequired}
                onChange={(e) =>
                  updateField("webcamRequired", e.target.checked)
                }
                label="Webcam Required"
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="lock-questions-after-answering"
                checked={!!quiz.lockQuestionsAfterAnswering}
                onChange={(e) =>
                  updateField("lockQuestionsAfterAnswering", e.target.checked)
                }
                label="Lock Questions After Answering"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableUntil?.substring?.(0, 10) || ""}
                onChange={(e) => updateField("availableUntil", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableFrom?.substring?.(0, 10) || ""}
                onChange={(e) => updateField("availableFrom", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableUntil?.substring?.(0, 10) || ""}
                onChange={(e) => updateField("availableUntil", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                value={quiz.accessCode || ""}
                onChange={(e) => updateField("accessCode", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-4">
          <Button variant="primary" onClick={() => save(false)}>
            Save
          </Button>

          <Button variant="success" onClick={() => save(true)}>
            Save & Publish
          </Button>

          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
