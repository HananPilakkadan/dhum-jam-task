import React, { useEffect, useState } from "react";
import Style from "./Dashboard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { currentUserData, updateData } from "../../store/slices/dashboardSlice";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
import useDashboard from "../../Logic/Dashboard/useDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { handleLogout } = useDashboard();
  const { userDetails } = useSelector((state) => state.dashboard);
  const { id } = useParams();
  //   const { handleSubmit } = useDashboard();
  const [values, setvalues] = useState({
    custom: {},
    category_6: {},
    category_7: {},
    category_8: {},
    category_9: {},
    category_10: {},
  });

  useEffect(() => {
    dispatch(currentUserData(id));
  }, []);

  const handleSubmit = () => {
    let data = {
      amount: {
        category_6: 100,
      },
    };

    dispatch(updateData(id, data));
  };

  return (
    <>
      <ToastContainer />
      <div className={Style.Dashboard}>
        <div className="wrapper">
          <div className={Style.Dashboard_head}>
            <h2>
              {userDetails?.name}, {userDetails?.location} on Dhum Jam
            </h2>
          </div>
          <div className={Style.Dashboard_container}>
            <div className={Style.Dashboard_container_item}>
              <div className={Style.Dashboard_itemLeft}>
                <h5>Do you want to change our customers requesing song?</h5>
              </div>
              <div className={Style.Dashboard_itemRight}>
                <div className={Style.Dashboard_singleItem}>
                  <input
                    type="radio"
                    name="yes"
                    id="radio"
                    checked={userDetails?.charge_customers === true}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className={Style.Dashboard_singleItem}>
                  <input
                    type="radio"
                    name="no"
                    id="radio"
                    checked={userDetails?.charge_customers === false}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
            <div
              className={`${Style.Dashboard_container_item} ${
                userDetails?.charge_customers === false &&
                Style.Dashboard_container_item_greyed
              }`}
            >
              <div className={Style.Dashboard_itemLeft}>
                <h5>Custom song requesting amount-</h5>
              </div>
              <div className={Style.Dashboard_itemRight}>
                <input
                  type="number"
                  name="amount"
                  className={Style.Dashboard_SingleInput}
                  onChange={(e) =>
                    setvalues((prev) => ({
                      ...prev,
                      custom: e.target.value,
                    }))
                  }
                  value={values.custom}
                  placeholder={userDetails?.amount?.category_6}
                  min={99}
                />
              </div>
            </div>
            <div
              className={`${Style.Dashboard_container_item} ${
                userDetails?.charge_customers === false &&
                Style.Dashboard_container_item_greyed
              }`}
            >
              <div className={Style.Dashboard_itemLeft}>
                <h5>Regular song requesting amount from high to low</h5>
              </div>
              <div className={Style.Dashboard_itemRight}>
                <input
                  type="number"
                  name="amount"
                  className={Style.Dashboard_smallInput}
                  placeholder={userDetails?.amount?.category_7}
                  min={79}
                  onChange={(e) =>
                    setvalues((prev) => ({
                      ...prev,
                      category_7: e.target.value,
                    }))
                  }
                  value={values.category_7}
                />
                <input
                  type="number"
                  name="amount"
                  className={Style.Dashboard_smallInput}
                  placeholder={userDetails?.amount?.category_8}
                  min={59}
                  onChange={(e) =>
                    setvalues((prev) => ({
                      ...prev,
                      category_8: e.target.value,
                    }))
                  }
                  value={values.category_8}
                />
                <input
                  type="number"
                  name="amount"
                  className={Style.Dashboard_smallInput}
                  placeholder={userDetails?.amount?.category_9}
                  min={39}
                  onChange={(e) =>
                    setvalues((prev) => ({
                      ...prev,
                      category_9: e.target.value,
                    }))
                  }
                  value={values.category_9}
                />
                <input
                  type="number"
                  name="amount"
                  className={Style.Dashboard_smallInput}
                  placeholder={userDetails?.amount?.category_10}
                  min={19}
                  onChange={(e) =>
                    setvalues((prev) => ({
                      ...prev,
                      category_10: e.target.value,
                    }))
                  }
                  value={values.category_10}
                />
              </div>
            </div>
            <div className={Style.graphContainer}>
              {userDetails?.charge_customers === true && (
                <Chart values={values} />
              )}
            </div>

            <button
              type="submit"
              className={`${Style.submitBtn} ${
                userDetails?.amount?.category_6 < 99 ||
                userDetails?.amount?.category_7 < 79 ||
                userDetails?.amount?.category_8 < 59 ||
                userDetails?.amount?.category_9 < 39 ||
                userDetails?.amount?.category_10 < 19
                  ? Style.submitBtn_greyed
                  : ""
              }`}
              disabled={
                userDetails?.amount?.category_6 < 99 ||
                userDetails?.amount?.category_7 < 79 ||
                userDetails?.amount?.category_8 < 59 ||
                userDetails?.amount?.category_9 < 39 ||
                userDetails?.amount?.category_10 < 19
                  ? true
                  : false
              }
              onClick={() => handleSubmit(values)}
            >
              Save
            </button>
            <button className={Style.LogoutBtn} onClick={() => handleLogout()}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
