import { ReactNode } from "react";
import AccountNavigation from "./navigation";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <hr />
      <div className="d-flex">
        <div className="d-none d-sm-block">
          <AccountNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
