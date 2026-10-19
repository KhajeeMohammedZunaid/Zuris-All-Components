"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function UniversalThemeShortcut() {
  const { resolvedTheme, setTheme } = useTheme();
  const themeRef = React.useRef(resolvedTheme);

  React.useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        const nextTheme = themeRef.current === "dark" ? "light" : "dark";
        setTheme(nextTheme);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <UniversalThemeShortcut />
      {children}
    </NextThemesProvider>
  );
}
