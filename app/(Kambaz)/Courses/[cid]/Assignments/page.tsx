import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <br />
          <div>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am
            <br />
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS Intro
          </Link>
          <br />
          <div>
            Module 2 | <b>Not available until</b> May 10 at 12:00am
            <br />
            <b>Due</b> May 17 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JavaScript Basics
          </Link>
          <br />
          <div>
            Module 3 | <b>Not available until</b> May 17 at 12:00am
            <br />
            <b>Due</b> May 24 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/126"
            className="wd-assignment-link"
          >
            A4 - React Components
          </Link>
          <br />
          <div>
            Module 4 | <b>Not available until</b> May 24 at 12:00am
            <br />
            <b>Due</b> May 31 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
      <h3 id="wd-quizzes-title">
        QUIZZES 20% of Total <button>+</button>
      </h3>
      <h3 id="wd-exams-title">
        EXAMS 30% of Total <button>+</button>
      </h3>
      <h3 id="wd-project-title">
        PROJECT 10% of Total <button>+</button>
      </h3>
    </div>
  );
}
