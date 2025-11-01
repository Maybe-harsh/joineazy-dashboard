import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Get the root element safely with a non-null assertion
const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
