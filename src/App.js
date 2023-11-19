import { useEffect } from "react";
import "./App.css";
import { getAxiosInstance, setAuthToken } from "./api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggin = localStorage.getItem("isLoggedIn");
  const { userData } = useSelector((state) => state.login);
  console.log(userData);

  if (token) {
    setAuthToken(token);
  }
  useEffect(() => {
    isLoggin && navigate(`/4/dashboard`);
  }, []);
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
