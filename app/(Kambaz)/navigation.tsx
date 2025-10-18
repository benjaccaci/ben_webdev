"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiBeaker1 } from "react-icons/ci";
export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard },
    { href: "/Dashboard", label: "Courses", icon: LiaBookSolid },
    { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline },
    { href: "/Inbox", label: "Inbox", icon: FaInbox },
    { href: "/Labs", label: "Labs", icon: CiBeaker1 },
  ];
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroupItem>
      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />{" "}
        <br /> Account
      </ListGroupItem>
      {links.map(({ href, label, icon: Icon }) => (
        <ListGroupItem
          key={href}
          as={Link}
          href={href}
          className={`${
            pathname.includes(label)
              ? "bg-white text-danger"
              : "bg-black text-white"
          } text-center border-0`}
        >
          <Icon className="fs-1 text-danger" /> <br />
          {label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
