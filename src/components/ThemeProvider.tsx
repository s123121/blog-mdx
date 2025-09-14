import * as React from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeContext = React.createContext<Ctx | null>(null);

let store;

if (typeof window !== "undefined") {
  store = localStorage;
} else {
  store = {
    getItem: (key: string) => null,
    setItem: (key: string, value: string) => null,
  };
}

export function ThemeProvider({ children, defaultTheme = "light" as Theme }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = store.getItem("theme") as Theme | null;
    return saved ?? defaultTheme;
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    store.setItem("theme", theme);
  }, [theme]);

  const toggle = React.useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
