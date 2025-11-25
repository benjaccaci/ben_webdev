/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import * as client from "../../../../client";
import { useDispatch } from "react-redux";
import { updateQuiz as updateQuizRedux } from "../../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>({});

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz({ ...data });
  };

  useEffect(() => {
    fetchQuiz();
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

  return (
    <div className="container py-3">
      <h2>Edit Quiz</h2>

      <Tabs defaultActiveKey="details" className="my-3">
        <Tab eventKey="details" title="Details">
          <div className="border rounded p-3">
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={quiz.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.points}
                    onChange={(e) =>
                      updateField("points", Number(e.target.value))
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quiz Type</Form.Label>
                  <Form.Select
                    value={quiz.quizType}
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
                    value={quiz.assignmentGroup}
                    onChange={(e) =>
                      updateField("assignmentGroup", e.target.value)
                    }
                  >
                    <option>Quizzes</option>
                    <option>Exams</option>
                    <option>Assignments</option>
                    <option>Project</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Shuffle Answers</Form.Label>
                  <Form.Select
                    value={quiz.shuffleAnswers ? "Yes" : "No"}
                    onChange={(e) =>
                      updateField("shuffleAnswers", e.target.value === "Yes")
                    }
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Time Limit (Minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.timeLimitMinutes}
                    onChange={(e) =>
                      updateField("timeLimitMinutes", Number(e.target.value))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Multiple Attempts</Form.Label>
                  <Form.Select
                    value={quiz.multipleAttempts ? "Yes" : "No"}
                    onChange={(e) =>
                      updateField("multipleAttempts", e.target.value === "Yes")
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </Form.Select>
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
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>One Question at a Time</Form.Label>
                  <Form.Select
                    value={quiz.showOneQuestionAtATime ? "Yes" : "No"}
                    onChange={(e) =>
                      updateField(
                        "showOneQuestionAtATime",
                        e.target.value === "Yes"
                      )
                    }
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Webcam Required</Form.Label>
                  <Form.Select
                    value={quiz.webcamRequired ? "Yes" : "No"}
                    onChange={(e) =>
                      updateField("webcamRequired", e.target.value === "Yes")
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Lock Questions After Answering</Form.Label>
                  <Form.Select
                    value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    onChange={(e) =>
                      updateField(
                        "lockQuestionsAfterAnswering",
                        e.target.value === "Yes"
                      )
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.availableUntil?.substring(0, 10)}
                    onChange={(e) =>
                      updateField("availableUntil", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.availableFrom?.substring(0, 10)}
                    onChange={(e) =>
                      updateField("availableFrom", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.availableUntil?.substring(0, 10)}
                    onChange={(e) =>
                      updateField("availableUntil", e.target.value)
                    }
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
        </Tab>

        <Tab
          eventKey="questions"
          title="Questions"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)
          }
        />
      </Tabs>
    </div>
  );
}
