import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="d-flex">
      <div className="flex-grow-1 p-3">
        <h3 className="mb-3">Profile</h3>

        <Form style={{ maxWidth: "400px" }}>
          <FormControl
            id="wd-username"
            placeholder="username"
            defaultValue="alice"
            className="mb-2"
          />

          <FormControl
            id="wd-password"
            type="password"
            placeholder="password"
            defaultValue="123"
            className="mb-2"
          />

          <FormControl
            id="wd-firstname"
            placeholder="First Name"
            defaultValue="Alice"
            className="mb-2"
          />

          <FormControl
            id="wd-lastname"
            placeholder="Last Name"
            defaultValue="Wonderland"
            className="mb-2"
          />

          <FormControl
            id="wd-dob"
            type="date"
            defaultValue="2000-01-01"
            placeholder="mm/dd/yyyy"
            className="mb-2"
          />

          <FormControl
            id="wd-email"
            type="email"
            placeholder="email"
            defaultValue="alice@wonderland"
            className="mb-2"
          />

          <Form.Select id="wd-role" defaultValue="FACULTY" className="mb-3">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>

          <Link
            href="/Account/Signin"
            id="wd-signout-btn"
            className="btn btn-danger w-100"
          >
            Signout
          </Link>
        </Form>
      </div>
    </div>
  );
}
