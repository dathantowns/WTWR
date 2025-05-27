import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "../src/components/App/App.jsx";
import "./index.css";
import { ModalProvider } from "./contexts/modalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <ModalProvider>
        <App />
      </ModalProvider>
    </HashRouter>
  </React.StrictMode>
);
