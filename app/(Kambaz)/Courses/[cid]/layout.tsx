/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import { RootState } from "../../store";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [navVisible, setNavVisible] = useState(true);
  const toggleNav = () => setNavVisible((prev) => !prev);
  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify className="me-4 fs-4 mb-1" onClick={toggleNav} />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {navVisible && (
          <div className="me-3">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
