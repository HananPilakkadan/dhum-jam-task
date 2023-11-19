import { useEffect } from "react";
import "./App.css";
import { getAxiosInstance, setAuthToken } from "./api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const token = localStorage.getItem("token");
  const isLoggin = localStorage.getItem("isLoggedIn");

  if (token) {
    setAuthToken(token);
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} exact index />
        <Route element={<PrivateRoutes />}>
          <Route path="/:id/dashboard" element={<Dashboard />} exact />
        </Route>
      </Routes>
    </>
  );
}

export default App;
