import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "./components/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
