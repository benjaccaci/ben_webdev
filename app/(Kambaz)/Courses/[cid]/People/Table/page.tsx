/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as client from "../../../client";
import PeopleDetails from "../Details";
import Link from "next/link";

interface PeopleTableProps {
  users?: any[];
  fetchUsers?: () => void;
}

export default function PeopleTable(props?: PeopleTableProps) {
  const propUsers = props?.users;
  const propFetchUsers = props?.fetchUsers;

  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const params = useParams();
  const courseId = params.cid;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!courseId) return;
      const enrolledUsers = await client.findUsersInCourse(courseId as string);
      setUsers(enrolledUsers);
    };
    fetchUsers();
  }, [courseId]);

  return (
    <>
      <div id="wd-people-table">
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <span
                    className="text-decoration-none"
                    onClick={() => {
                      setShowDetails(true);
                      setShowUserId(user._id);
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name text-danger">
                      {user.firstName}
                    </span>{" "}
                    <span className="wd-last-name text-danger">
                      {user.lastName}
                    </span>
                  </span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            propFetchUsers && propFetchUsers();
          }}
        />
      )}
    </>
  );
}
