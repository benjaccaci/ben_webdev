"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0 me-3" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 1
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 2
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
