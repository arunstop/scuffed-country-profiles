import React, { useEffect } from "react";
import { useUiContext } from "../utils/contexts/ui/UiHook";

export default function Header() {
  const { state: uiState, action: uiAction } = useUiContext();

  useEffect(() => {
    const isDarkMode: boolean =
      document.documentElement.classList.contains("dark");

    return () => {};
  }, []);

  return (
    <header className="flex h-16 w-full items-center bg-purple-400 p-4 dark:bg-red-500 transition-colors">
      <span>Country Profiles</span>
      <div className="inline-flex ml-auto items-center justify-center gap-4">
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
