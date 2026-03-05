import React, { createContext, useContext, useState, useEffect } from "react";
import type { ThemeState } from "../types";

const ThemeContext = createContext<{
  state: ThemeState;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ThemeState>(() => {
    const saved = localStorage.getItem("theme");
    return { isDark: saved === "dark" };
  });

  const toggleTheme = () => {
    setState((prev) => {
      const newTheme = !prev.isDark;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return { isDark: newTheme };
    });
  };

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  return (
    <ThemeContext.Provider value={{ state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
