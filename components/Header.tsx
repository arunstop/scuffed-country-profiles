import React from "react";
import { useUiContext } from "../utils/contexts/ui/UiHook";

export default function Header() {
  const { state: uiState, action: uiAction } = useUiContext();

  return (
    <header className="fixed z-10 flex h-16 w-full items-center bg-neutral/90 p-4 transition-colors shadow-lg">
      <span>Country Profiles</span>
      <div className="inline-flex ml-auto items-center justify-center gap-4 ">
        <span>{uiState.darkMode + ""}</span>
        <label>Dark mode :</label>
        <input
          checked={uiState.darkMode}
          type={"checkbox"}
          onChange={(event) => uiAction.toggleDarkMode(event.target.checked)}
        />
      </div>
    </header>
  );
}
