"use client";

import { useState } from "react";
import { Button, Dropdown, Form, InputGroup, ListGroup } from "react-bootstrap";
import {
  FaArrowDown,
  FaBan,
  FaCheckCircle,
  FaEllipsisV,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import Link from "next/link";
import { useParams } from "next/navigation";
import { quizzes } from "./data";

export default function Quizzes() {
  const [search, setSearch] = useState("");
  const [quizList, setQuizList] = useState(quizzes);
  const { cid } = useParams();

  const togglePublish = (id: string) => {
    setQuizList((prev) =>
      prev.map((quiz) =>
        quiz.id === id
          ? {
              ...quiz,
              status: quiz.status === "Published" ? "Unpublished" : "Published",
            }
          : quiz
      )
    );
  };

  const deleteQuiz = (id: string) => {
    const confirmed = window.confirm("Delete this quiz?");
    if (!confirmed) return;
    setQuizList((prev) => prev.filter((q) => q.id !== id));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="p-3 d-flex flex-column gap-3" id="wd-quizzes-page">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h1 className="mb-0">Quizzes</h1>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <InputGroup style={{ maxWidth: "340px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <FaArrowDown className="me-2" /> Sort
          </Button>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <FaFilter className="me-2" /> Filter
          </Button>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <FaBan className="me-2" /> Unpublish
          </Button>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <FaEye className="me-2" /> Publish All
          </Button>
          <Button variant="danger" className="d-flex align-items-center">
            <FaPlus className="me-2" /> Add Quiz
          </Button>
        </div>
      </div>
      <div className="border rounded">
        <div className="d-flex align-items-center bg-light p-3 border-bottom">
          <FaEllipsisV className="me-2" />
          <FaArrowDown className="me-3" />
          <strong className="me-auto">Assignment Quizzes</strong>
          <span className="text-muted me-2">100% of Total</span>
          <Button size="sm" variant="light" className="me-2">
            +
          </Button>
          <FaEllipsisV />
        </div>

        <ListGroup variant="flush">
          {quizList.map((quiz) => (
            <ListGroup.Item
              key={quiz.id}
              className="d-flex align-items-start gap-3 border-0 border-start border-5 border-success"
            >
              <FaRocket className="fs-5 text-secondary mt-1" />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz.id}`}
                      className="fw-bold text-dark text-decoration-none"
                    >
                      {quiz.title}
                    </Link>
                    <div className="text-muted small">
                      <span className="text-danger fw-semibold">
                        {quiz.availability === "Available"
                          ? "AVAILABLE"
                          : "CLOSED"}
                      </span>{" "}
                      | Available from{" "}
                      {formatDate(new Date(quiz.availableFrom))} | Due{" "}
                      {formatDate(new Date(quiz.availableUntil))} |{" "}
                      {quiz.points} pts | {quiz.questions} questions
                    </div>
                  </div>
                </div>
              </div>
              {quiz.status === "Published" ? (
                <FaCheckCircle className="text-success fs-5 mt-1" />
              ) : (
                <FaBan className="text-danger fs-5 mt-1" />
              )}
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="span"
                  style={{ cursor: "pointer" }}
                  className="text-secondary"
                >
                  <FaEllipsisV className="fs-5 mt-1" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    href={`/Courses/${cid}/Quizzes/${quiz.id}`}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteQuiz(quiz.id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => togglePublish(quiz.id)}>
                    {quiz.status === "Published" ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
