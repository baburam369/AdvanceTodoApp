import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoContextProvider } from "./contexts/todoContext.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </AppContextProvider>
  </StrictMode>
);
