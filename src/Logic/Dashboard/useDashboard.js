import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateData } from "../../store/slices/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { updatedData } = useSelector((state) => state.dashboard);
  console.log(updatedData);
  const { id } = useParams();

  const handleSubmit = (vlaues) => {
    let data = {
      amount: {
        category_6: 100,
      },
    };
    dispatch(updateData(id, data));
  };
  return { handleSubmit };
};

export default useDashboard;
