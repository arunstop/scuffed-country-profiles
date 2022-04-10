import React, { useEffect, useState } from "react";

export default function Header() {
  function toggleDarkMode(value: boolean) {
    if (value === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDark(value);
  }
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode: boolean =
      document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    return () => {};
  }, []);

  return (
    <header className="flex h-16 w-full items-center bg-purple-400 p-4 dark:bg-red-500 transition-colors">
      <span>Country Profiles</span>
      <div className="inline-flex ml-auto items-center justify-center gap-4">
        <label>Dark mode :</label>
        <input
          checked={isDark}
          type={"checkbox"}
          onChange={(event) => toggleDarkMode(event.target.checked)}
        />
      </div>
    </header>
  );
}
