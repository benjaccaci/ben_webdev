/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import * as client from "../../client";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const quizzes = useSelector(
    (state: RootState) => state.quizzesReducer.quizzes
  );
  const [search, setSearch] = useState("");
  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    if (!cid) return;
    fetchQuizzes();
  }, [cid]);

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const togglePublish = async (quiz: any) => {
    const newStatus = quiz.status === "Published" ? "Unpublished" : "Published";
    const updated = { ...quiz, status: newStatus };

    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuizForCourse(cid as string, {});
    dispatch(addQuiz(newQuiz));
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
  };

  const handleDelete = async (quizId: string) => {
    const confirmed = window.confirm("Delete this quiz?");
    if (!confirmed) return;

    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort(
      (a, b) =>
        new Date(a.availableFrom).getTime() -
        new Date(b.availableFrom).getTime()
    );
  }, [quizzes]);

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
            variant="danger"
            className="d-flex align-items-center"
            onClick={handleAddQuiz}
          >
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
          {sortedQuizzes.map((quiz) => (
            <ListGroup.Item
              key={quiz._id}
              className="d-flex align-items-start gap-3 border-0 border-start border-5 border-success"
            >
              <FaRocket className="fs-5 text-secondary mt-1" />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}
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
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => togglePublish(quiz)}>
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
