import { PropsWithChildren } from "react";
import { Sidebar } from "./components/sidebar";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}