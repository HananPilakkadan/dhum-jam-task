import { Formik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useLogin } from "../../Logic/Login/useLogin";

import Style from "./Login.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { handleLogin } = useLogin();
  const initialValues = {
    username: "",
    password: "",
  };
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Enter valid Username")
      .max(50, "Enter valid Username")
      .required("Username is Required"),
    password: Yup.string()
      .min(2, "Enter valid Password")
      .max(50)
      .required("Passsword is Required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { authError } = useSelector((state) => state.login);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="login-container ">
        <div className="wrapper">
          <div className={Style.loginBox}>
            <h1 className={Style.loginBox_heading}>venue admin login </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={Style.loginBox_input_box}>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Username"
                      className={Style.loginBox_input}
                    />
                  </div>
                  <span className={Style.loginBox_errorMsg}>
                    {errors.username && touched.username}
                  </span>
                  <div className={Style.loginBox_input_box}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      className={Style.loginBox_input}
                    />
                    <span onClick={() => handleShowPassword()}>
                      {showPassword ? (
                        <FaEyeSlash className={Style.eye_icon} />
                      ) : (
                        <FaEye className={Style.eye_icon} />
                      )}
                    </span>
                  </div>
                  <span className={Style.loginBox_errorMsg}>
                    {(authError !== "idle" ? authError : "") ||
                      (errors.password && touched.password)}
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={Style.loginBox_SubmitBtn}
                  >
                    Sign in
                  </button>
                  <Link className={Style.loginBox_register} to={"/"}>
                    New Registration?
                  </Link>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
