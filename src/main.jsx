import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { ApiProvider } from "./API/ApiContext.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);
