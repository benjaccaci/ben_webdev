/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  if (!assignment) {
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
              defaultValue={assignment.title}
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
                  defaultValue="The assignment is available online. Submit a link to the landing page of your project."
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
            <Form.Control id="wd-points" type="number" defaultValue="100" />
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
              defaultValue="2024-05-13"
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
              defaultValue="2024-05-06"
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
              defaultValue="2024-05-20"
            />
          </Col>
        </Row>

        <Row className="pt-3">
          <Col
            sm={{ span: 9, offset: 3 }}
            className="d-flex gap-2 justify-content-end"
          >
            <Link href={`/Courses/${cid}/Assignments`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Link href={`/Courses/${cid}/Assignments`}>
              <Button variant="danger">Save</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
