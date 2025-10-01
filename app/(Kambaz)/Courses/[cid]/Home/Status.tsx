"use client";

import { Button } from "react-bootstrap";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaClone,
  FaHome,
  FaStream,
  FaBullhorn,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }} className="me-3">
      <h2>Course Status</h2>

      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-unpublish"
          >
            <FaTimesCircle className="me-2 fs-5" />
            Unpublish
          </Button>
        </div>
        <div className="w-50 ps-1">
          <Button variant="success" size="lg" className="w-100" id="wd-publish">
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </Button>
        </div>
      </div>

      <br />

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-existing-content"
      >
        <FaDownload className="me-2 fs-5" />
        Import Existing Content
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-from-commons"
      >
        <FaClone className="me-2 fs-5" />
        Import from Commons
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-choose-home-page"
      >
        <FaHome className="me-2 fs-5" />
        Choose Home Page
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-course-stream"
      >
        <FaStream className="me-2 fs-5" />
        View Course Stream
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-announcements"
      >
        <FaBullhorn className="me-2 fs-5" />
        New Announcement
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-analytics"
      >
        <FaChartBar className="me-2 fs-5" />
        New Analytics
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-course-notifications"
      >
        <FaBell className="me-2 fs-5" />
        View Course Notifications
      </Button>
    </div>
  );
}
