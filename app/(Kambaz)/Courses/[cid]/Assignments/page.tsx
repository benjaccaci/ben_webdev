"use client";

import Link from "next/link";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaCheckCircle } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search..." id="wd-search-assignment" />
        </InputGroup>

        <div>
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      <h3
        id="wd-assignments-title"
        className="d-flex justify-content-between align-items-center border p-2 bg-light"
      >
        <span>
          <IoEllipsisVertical />
          <VscTriangleDown className="me-2" />
          ASSIGNMENTS
        </span>
        <span>
          40% of Total{" "}
          <Button size="sm" variant="light">
            +
          </Button>
          <IoEllipsisVertical />
        </span>
      </h3>

      <ListGroup className="mb-4">
        <ListGroup.Item className="d-flex border-0 border-start border-5 border-success">
          <IoEllipsisVertical className="fs-4 align-self-center" />
          <FaBook className="text-success fs-4 align-self-center me-3" />
          <div className="flex-grow-1">
            <Link
              href="/Courses/1234/Assignments/123"
              className="fw-bold text-dark text-decoration-none"
            >
              A1 - ENV + HTML
            </Link>
            <div className="text-muted small">
              <span className="text-danger">
                {" "}
                <b>Multiple Modules </b>
              </span>{" "}
              | <b>Not available until</b> May 3 at 12:00am <br />
              <b>Due</b> May 10 at 11:59pm | 50 pts
            </div>
          </div>
          <FaCheckCircle className="text-success fs-4 align-self-center ms-3" />
          <IoEllipsisVertical className="fs-4 align-self-center ms-3" />
        </ListGroup.Item>

        <ListGroup.Item className="d-flex border-0 border-start border-5 border-success">
          <IoEllipsisVertical className="fs-4 align-self-center" />
          <FaBook className="text-success fs-4 align-self-center me-3" />
          <div className="flex-grow-1">
            <Link
              href="/Courses/1234/Assignments/124"
              className="fw-bold text-dark text-decoration-none"
            >
              A2 - CSS Intro
            </Link>
            <div className="text-muted small">
              <span className="text-danger">
                {" "}
                <b>Module 2 </b>
              </span>{" "}
              | <b>Not available until</b> May 10 at 12:00am <br />
              <b>Due</b> May 17 at 11:59pm | 100 pts
            </div>
          </div>
          <FaCheckCircle className="text-success fs-4 align-self-center ms-3" />
          <IoEllipsisVertical className="fs-4 align-self-center ms-3" />
        </ListGroup.Item>

        <ListGroup.Item className="d-flex border-0 border-start border-5 border-success">
          <IoEllipsisVertical className="fs-4 align-self-center" />
          <FaBook className="text-success fs-4 align-self-center me-3" />
          <div className="flex-grow-1">
            <Link
              href="/Courses/1234/Assignments/125"
              className="fw-bold text-dark text-decoration-none"
            >
              A3 - JavaScript Basics
            </Link>
            <div className="text-muted small">
              <span className="text-danger">
                {" "}
                <b>Module 3 </b>
              </span>{" "}
              | <b>Not available until</b> May 17 at 12:00am <br />
              <b>Due</b> May 24 at 11:59pm | 100 pts
            </div>
          </div>
          <FaCheckCircle className="text-success fs-4 align-self-center ms-3" />
          <IoEllipsisVertical className="fs-4 align-self-center ms-3" />
        </ListGroup.Item>
      </ListGroup>

      <h3
        id="wd-quizzes-title"
        className="d-flex justify-content-between align-items-center border p-2 bg-light"
      >
        <span>
          <IoEllipsisVertical />
          <VscTriangleDown className="me-2" />
          QUIZZES
        </span>
        <span>
          20% of Total{" "}
          <Button size="sm" variant="light">
            +
          </Button>
          <IoEllipsisVertical />
        </span>
      </h3>

      <h3
        id="wd-exams-title"
        className="d-flex justify-content-between align-items-center border p-2 bg-light"
      >
        <span>
          <IoEllipsisVertical />
          <VscTriangleDown className="me-2" />
          EXAMS
        </span>
        <span>
          30% of Total{" "}
          <Button size="sm" variant="light">
            +
          </Button>
          <IoEllipsisVertical />
        </span>
      </h3>

      <h3
        id="wd-project-title"
        className="d-flex justify-content-between align-items-center border p-2 bg-light"
      >
        <span>
          <IoEllipsisVertical />
          <VscTriangleDown className="me-2" />
          PROJECT
        </span>
        <span>
          10% of Total{" "}
          <Button size="sm" variant="light">
            +
          </Button>
          <IoEllipsisVertical />
        </span>
      </h3>
    </div>
  );
}
