import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeProvider } from "./context/DarkModeContext";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "#1f2937",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
