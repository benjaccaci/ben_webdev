/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ListGroup, FormControl, ListGroupItem } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { RootState } from "../../../store";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  return (
    <div className="wd-modules">
      <div>
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      </div>
      <br />
      <div>
        <ListGroup id="wd-modules" className="rounded-0">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any, i: number) => (
              <ListGroupItem
                key={module._id ?? module.id ?? module.name ?? i}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && (
                    <span className="me-auto">{module.name}</span>
                  )}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block me-auto"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={() => dispatch(deleteModule(module._id))}
                    editModule={() => dispatch(editModule(module._id))}
                  />
                </div>

                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any, j: number) => (
                      <ListGroupItem
                        key={lesson.id ?? lesson._id ?? lesson.name ?? j}
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
      </div>
    </div>
  );
}
