import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateData } from "../../store/slices/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updatedData } = useSelector((state) => state.dashboard);
  const { id } = useParams();

  const handleSubmit = (vlaues) => {
    let data = {
      amount: {
        category_6: 100,
      },
    };
    dispatch(updateData(id, data));
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("token", "");
    localStorage.setItem("isLoggedIn", false);
    navigate("/");
  };
  return { handleSubmit, handleLogout };
};

export default useDashboard;
