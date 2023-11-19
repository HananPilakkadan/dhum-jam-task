import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogin = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (values) => {
    const LogginData = await dispatch(getUserData(values));
    if (getUserData.fulfilled.match(LogginData)) {
      let token = LogginData.payload?.data?.data?.token;
      let userId = LogginData.payload?.data?.data?.id;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
      setAuthToken(token);
      if (location.state?.from) {
        navigate(`${userId}/dashboard`);
        toast.success("Successfully Logged in", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return {
    handleLogin,
  };
};
