import { PropsWithChildren } from "react";
import { Sidebar } from "./components/sidebar";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="h-full w-full px-10 pt-10">{children}</div>
    </div>
  );
}
