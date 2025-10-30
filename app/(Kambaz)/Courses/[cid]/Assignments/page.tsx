/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const handleDeleteClick = (assignment: any) => {
    const confirmed = confirm(
      `Are you sure you want to remove the assignment "${assignment.title}"?`
    );
    if (confirmed) {
      dispatch(deleteAssignment(assignment._id));
    }
  };

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
          <Link href={`/Courses/${cid}/Assignments/new`}>
            <Button variant="danger" size="lg" id="wd-add-assignment">
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </Link>
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
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroup.Item
              key={assignment._id}
              className="d-flex border-0 border-start border-5 border-success"
            >
              <IoEllipsisVertical className="fs-4 align-self-center" />
              <FaBook className="text-success fs-4 align-self-center me-3" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="fw-bold text-dark text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">
                    <b>Multiple Modules</b>
                  </span>{" "}
                  | <b>Not available until</b>{" "}
                  {assignment.availableUntilDate || "May 6 at 12:00am"}
                  <br />
                  <b>Due</b> {assignment.dueDate || "May 13 at 11:59pm"} |{" "}
                  {assignment.points || 100} pts
                </div>
              </div>
              <FaTrash
                className="text-danger fs-5 align-self-center ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteClick(assignment)}
              />
              <FaCheckCircle className="text-success fs-4 align-self-center ms-3" />
              <IoEllipsisVertical className="fs-4 align-self-center ms-3" />
            </ListGroup.Item>
          ))}
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
