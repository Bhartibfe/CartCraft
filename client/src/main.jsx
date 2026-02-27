import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import useScrollFade from "./utils/useScrollFade.jsx";

function Root() {
  useScrollFade();
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Root />
  </ThemeProvider>,
);
