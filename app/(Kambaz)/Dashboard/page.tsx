import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjsicon.jpg"
              width={275}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1000" className="wd-dashboard-course-link">
            <Image
              src="/images/javaicon.jpg"
              width={275}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS1000 Intro to Java </h5>
              <p className="wd-dashboard-course-title">OOP Basics</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1100" className="wd-dashboard-course-link">
            <Image src="/images/pyicon.jpg" width={275} height={150} alt={""} />
            <div>
              <h5> CS1100 Intro to Python </h5>
              <p className="wd-dashboard-course-title">FP Basics</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1200" className="wd-dashboard-course-link">
            <Image src="/images/cicon.jpg" width={275} height={150} alt={""} />
            <div>
              <h5> CS1200 Intro to C </h5>
              <p className="wd-dashboard-course-title">
                Programming Intermediate
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1300" className="wd-dashboard-course-link">
            <Image
              src="/images/cppicon.jpg"
              width={275}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS1300 Intro to C++ </h5>
              <p className="wd-dashboard-course-title">Programming Advanced</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1400" className="wd-dashboard-course-link">
            <Image src="/images/csicon.jpg" width={275} height={150} alt={""} />
            <div>
              <h5> CS1400 Intro to C# </h5>
              <p className="wd-dashboard-course-title">Game Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1500" className="wd-dashboard-course-link">
            <Image src="/images/jsicon.jpg" width={275} height={150} alt={""} />
            <div>
              <h5> CS1500 Intro to JavaScript </h5>
              <p className="wd-dashboard-course-title">More Web Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
