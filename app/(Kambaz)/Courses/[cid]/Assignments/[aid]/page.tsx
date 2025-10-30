/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const isNew = aid === "new";
  const existingAssignment = isNew
    ? null
    : assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(
    existingAssignment?.description ||
      "The assignment is available online. Submit a link to the landing page of your project."
  );
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [dueDate, setDueDate] = useState(
    existingAssignment?.dueDate || "2024-05-13"
  );
  const [availableFromDate, setAvailableFromDate] = useState(
    existingAssignment?.availableFromDate || "2024-05-06"
  );
  const [availableUntilDate, setAvailableUntilDate] = useState(
    existingAssignment?.availableUntilDate || "2024-05-20"
  );

  const handleSave = () => {
    if (isNew) {
      const newAssignmentData = {
        title,
        description,
        points: Number(points),
        dueDate,
        availableFromDate,
        availableUntilDate,
        course: cid,
      };
      dispatch(addAssignment(newAssignmentData));
    } else {
      const updatedAssignmentData = {
        ...existingAssignment,
        title,
        description,
        points: Number(points),
        dueDate,
        availableFromDate,
        availableUntilDate,
      };
      dispatch(updateAssignment(updatedAssignmentData));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!isNew && !existingAssignment) {
    return <div className="container py-3">Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container py-3">
      <Form>
        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-name" className="fw-semibold">
            Assignment Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              id="wd-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Assignment name"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-description"
            className="fw-semibold"
          >
            <span className="invisible">Description</span>
          </Form.Label>
          <Col sm={9}>
            <Card className="border-0 p-0">
              <Card.Body className="p-0">
                <Form.Control
                  as="textarea"
                  rows={6}
                  id="wd-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-points" className="fw-semibold">
            Points
          </Form.Label>
          <Col sm={4} md={3}>
            <Form.Control
              id="wd-points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-group" className="fw-semibold">
            Assignment Group
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Select id="wd-group" defaultValue="Assignments">
              <option value="Assignments">Assignments</option>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Projects">Projects</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-display-grade-as"
            className="fw-semibold"
          >
            Display Grade as
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Letter">Letter</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-submission-type"
            className="fw-semibold"
          >
            Submission Type
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Select id="wd-submission-type" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="fw-semibold">
            Online Entry Options
          </Form.Label>
          <Col sm={9}>
            <Card className="p-3">
              <Form.Check id="wd-text-entry" label="Text Entry" />
              <Form.Check id="wd-website-url" label="Website URL" />
              <Form.Check id="wd-media-recordings" label="Media Recordings" />
              <Form.Check
                id="wd-student-annotation"
                label="Student Annotation"
              />
              <Form.Check id="wd-file-upload" label="File Uploads" />
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-assign-to"
            className="fw-semibold"
          >
            Assign to
          </Form.Label>
          <Col sm={9} md={6}>
            <InputGroup>
              <Form.Control id="wd-assign-to" defaultValue="Everyone" />
            </InputGroup>
          </Col>
        </Row>

        <Row className="mt-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-due-date"
            className="fw-semibold"
          >
            Due
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Control
              type="date"
              id="wd-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-available-from"
            className="fw-semibold"
          >
            Available from
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Control
              type="date"
              id="wd-available-from"
              value={availableFromDate}
              onChange={(e) => setAvailableFromDate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mt-3 mb-4">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-available-until"
            className="fw-semibold"
          >
            Until
          </Form.Label>
          <Col sm={9} md={6}>
            <Form.Control
              type="date"
              id="wd-available-until"
              value={availableUntilDate}
              onChange={(e) => setAvailableUntilDate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="pt-3">
          <Col
            sm={{ span: 9, offset: 3 }}
            className="d-flex gap-2 justify-content-end"
          >
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
