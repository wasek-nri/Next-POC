"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { ThemeToggleContext } from "../ThemeToggle/ThemeToggleContext";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import customTheme from './theme';

export default function ThemeRegistry(
  { children }: { children: React.ReactNode },
) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(customTheme,{
        palette: {
          mode,
        },
      }),
    [mode],
  );
  
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeToggleContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline  />
          {children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}