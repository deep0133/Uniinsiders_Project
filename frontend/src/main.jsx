import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/user/UserContextProvider.jsx";
import PostContextProvider from "./context/post/PostContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
