/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as {
    currentUser: { role: string } | null;
  };

  if (!currentUser) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  const links =
    currentUser.role === "ADMIN" ? ["Profile", "Users"] : ["Signin", "Signup"];

  return (
    <Nav variant="pills" className="flex-column">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
