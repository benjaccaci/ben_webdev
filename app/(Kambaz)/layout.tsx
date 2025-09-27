import { ReactNode } from "react";
import KambazNavigation from "./navigation";
import "./styles.css";
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill wd-main-content-offset ps-4">{children}</div>
      </div>
    </div>
  );
}
