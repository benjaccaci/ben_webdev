import { AiFillBook, AiOutlineBook, AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { BiBook, BiHelpCircle, BiInfoCircle } from "react-icons/bi";
import { CiBeaker1 } from "react-icons/ci";
export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed
                    bottom-0
                    top-0 d-none d-md-block
                    bg-black z-2"
      style={{ width: 120 }}
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account{" "}
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className="border-0
                  bg-white text-center"
      >
        <Link
          href="/Dashboard"
          className="text-danger
           text-decoration-none"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className="border-0
                  bg-black text-center"
      >
        <Link
          href="/Dashboard"
          className="text-danger
           text-decoration-none"
        >
          <BiBook className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className="border-0
                  bg-black text-center"
      >
        <Link
          href="/Help"
          className="text-danger
           text-decoration-none"
        >
          <BiHelpCircle className="fs-1 text-danger" />
          <br />
          Help
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className="border-0
                  bg-black text-center"
      >
        <Link
          href="/Info"
          className="text-danger
           text-decoration-none"
        >
          <BiInfoCircle className="fs-1 text-danger" />
          <br />
          Info
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className="border-0
                  bg-black text-center"
      >
        <Link
          href="/Labs"
          className="text-danger
           text-decoration-none"
        >
          <CiBeaker1 className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
