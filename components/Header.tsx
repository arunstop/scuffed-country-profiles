import Link from "next/link";
import React from "react";
import { useUiContext } from "../utils/contexts/ui/UiHook";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const { state: uiState, action: uiAction } = useUiContext();

  return (
    <header
      className="fixed z-10 flex h-16 w-full items-center
      bg-base-100/90 p-4 shadow-lg transition-colors"
    >
      <Link href={"/#countries"} passHref>
        <a>Country Profiles</a>
      </Link>
      <div className="ml-auto inline-flex items-center justify-center gap-4 ">
        {/* <label>Dark mode :</label> */}
        <label className="swap swap-rotate">
          <input
            checked={uiState.darkMode}
            type={"checkbox"}
            onChange={(event) => uiAction.toggleDarkMode(event.target.checked)}
          />
          <MdOutlineLightMode
            title="Turn on dark mode"
            className="swap-on text-3xl"
          />
          <MdOutlineDarkMode
            title="Turn of dark mode"
            className="swap-off text-3xl"
          />
        </label>
      </div>
    </header>
  );
}
