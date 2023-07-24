import { useEffect, useState } from "react";

const useTheme = (): string => {
  const [themeValue, setThemeValue] = useState("");

  useEffect(() => {
    setThemeValue(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  return themeValue;
};

export default useTheme;
