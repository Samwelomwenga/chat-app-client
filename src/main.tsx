import React from "react";
import ReactDOM from "react-dom/client";
import {  AuthProvider } from "./context/AuthContext.tsx";
import Router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
      </AuthProvider>
    
  </React.StrictMode>
);
