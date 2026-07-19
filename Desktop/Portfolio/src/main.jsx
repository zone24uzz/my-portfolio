import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        backgroundColor: "#0B1024",
        color: "#B9C2D3",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.9rem",
      }}>
        Loading...
      </div>
    }>
      <App />
    </Suspense>
  </React.StrictMode>
);
