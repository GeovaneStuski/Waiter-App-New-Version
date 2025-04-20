import Logo from "@/assets/images/sidebar-logo.svg";
import Image from "next/image";
import { tabs } from "./tabs";
import { LinkButton } from "./components/link-button";
import { headers } from "next/headers";
import { Logout } from "./components/logout";

export function Sidebar() {
  const headersList = headers();

  const pathname = headersList.get("x-current-path");

  const middleTabs = tabs.filter((tab) => tab.position === "middle");
  const bottomTabs = tabs.filter((tab) => tab.position === "bottom");

  return (
    <div className="shadow- flex h-full w-[108px] flex-col items-center justify-between border-r border-zinc-100 bg-white pt-10 shadow-sidebar">
      <Image
        width={41}
        height={29}
        style={{ width: "auto", height: "auto" }}
        src={Logo.src}
        alt="sidebar-logo"
      />

      <div>
        {middleTabs.map((tab) => (
          <LinkButton active={pathname === tab.link} key={tab.label} {...tab} />
        ))}
      </div>

      <div>
        {bottomTabs.map((tab) => (
          <LinkButton active={pathname === tab.link} key={tab.label} {...tab} />
        ))}

        <Logout />
      </div>
    </div>
  );
}
