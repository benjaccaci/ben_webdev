/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  return (
    <ListGroup id="wd-modules" className="rounded-0">
      {modules
        .filter((module: any) => module.course === cid)
        .map((module: any, i: number) => (
          <ListGroupItem
            key={module.id ?? module.name ?? i}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
              <ModuleControlButtons />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, j: number) => (
                  <ListGroupItem
                    key={lesson.id ?? lesson.name ?? j}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
}
