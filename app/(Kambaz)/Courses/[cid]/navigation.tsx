"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = [
    { href: "Home", label: "Home" },
    { href: "Modules", label: "Modules" },
    { href: "Piazza", label: "Piazza" },
    { href: "Zoom", label: "Zoom" },
    { href: "Assignments", label: "Assignments" },
    { href: "Quizzes", label: "Quizzes" },
    { href: "Grades", label: "Grades" },
    { href: "People/Table", label: "People" },
  ];
  return (
    <div className="rounded-0 border-0 list-group">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          className={`list-group-item border-0 ${
            pathname.endsWith(href)
              ? "text-dark border-start border-dark border-3"
              : "text-danger"
          }`}
          href={`/Courses/${cid}/${href}`}
        >
          {label}{" "}
        </Link>
      ))}
    </div>
  );
}
