import React, { useState, useEffect } from "react";
import { LuMoon } from "react-icons/lu";
function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle("dark", darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-zinc-900 rounded-lg  hover:bg-gray-200 dark:hover:bg-zinc-800 focus:outline-none transition"
    >
      {isDarkMode ? (
        <LuMoon className="text-lg "/>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.221 4.222l1.06 1.06M17.718 17.718l1.06 1.06M3 12h1.5M19.5 12H21M4.221 19.778l1.06-1.06M17.718 6.282l1.06-1.06M8.25 12a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default DarkModeToggle;
