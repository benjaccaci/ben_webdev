/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            defaultValue={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            defaultValue={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            defaultValue={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            {" "}
            Update{" "}
          </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}

//   return (
//     <div id="wd-profile-screen" className="d-flex">
//       <div className="flex-grow-1 p-3">
//         <h3 className="mb-3">Profile</h3>

//         <Form style={{ maxWidth: "400px" }}>
//           <FormControl
//             id="wd-username"
//             placeholder="username"
//             defaultValue="alice"
//             className="mb-2"
//           />

//           <FormControl
//             id="wd-password"
//             type="password"
//             placeholder="password"
//             defaultValue="123"
//             className="mb-2"
//           />

//           <FormControl
//             id="wd-firstname"
//             placeholder="First Name"
//             defaultValue="Alice"
//             className="mb-2"
//           />

//           <FormControl
//             id="wd-lastname"
//             placeholder="Last Name"
//             defaultValue="Wonderland"
//             className="mb-2"
//           />

//           <FormControl
//             id="wd-dob"
//             type="date"
//             defaultValue="2000-01-01"
//             placeholder="mm/dd/yyyy"
//             className="mb-2"
//           />

//           <FormControl
//             id="wd-email"
//             type="email"
//             placeholder="email"
//             defaultValue="alice@wonderland"
//             className="mb-2"
//           />

//           <Form.Select id="wd-role" defaultValue="FACULTY" className="mb-3">
//             <option value="USER">User</option>
//             <option value="ADMIN">Admin</option>
//             <option value="FACULTY">Faculty</option>
//             <option value="STUDENT">Student</option>
//           </Form.Select>

//           <Link
//             href="/Account/Signin"
//             id="wd-signout-btn"
//             className="btn btn-danger w-100"
//           >
//             Signout
//           </Link>
//         </Form>
//       </div>
//     </div>
//   );
// }
