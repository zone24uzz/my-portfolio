import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import PageLoader from "./components/PageLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
