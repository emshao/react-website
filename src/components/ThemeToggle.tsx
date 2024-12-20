import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(() => {
    // Check for saved theme or default to system preference
    return localStorage.getItem("theme") || getSystemTheme();
  });

  useEffect(() => {
    // Apply the theme by setting the `data-theme` attribute on <html>
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      id="theme-toggle-button"
      onClick={toggleTheme}
      style={{
        borderRadius: "50%",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {theme === "light" ? "☀️" : "🌙"}

    </button>
  );
};

export default ThemeToggle;
