import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLink from "../components/AuthLink";
import Modal from "../components/Modals";
import { RxCross2 } from "react-icons/rx";
// Backend Link: https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app

const Login = () => {
  const user = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [forgotPassword, setForgotPassword] = useState("");
  const [forgotPassLoading, setForgotPassLoading] = useState(false);
  const [next, setNext] = useState(false);

  const handleChangeForgotPassword = (e) => {
    setForgotPassword(e.target.value);
    setErrorMsg({});
  };

  const handleForgotPassword = async () => {
    try {
      setForgotPassLoading(true);
      const forgotPasswordData = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/forgotPassword",
        {
          forgotPassword: forgotPassword,
        },
      );

      const { error, message, errorField } = forgotPasswordData.data;
      if (error) {
        setErrorMsg({ [errorField]: error });
        inputRef.current[errorField].focus();
        setForgotPassLoading(false);
        setNext(false);
      } else if (message) {
        setForgotPassword("");
        setModalOpen(false);
        localStorage.setItem("forgotPassword", JSON.stringify(forgotPassword));
        setForgotPassLoading(false);
        setNext(true);
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyUpForgotPassword = async (e) => {
    if (e.key === "Enter") {
      try {
        setForgotPassLoading(true);
        const forgotPasswordData = await axios.post(
          "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/forgotPassword",
          {
            forgotPassword: forgotPassword,
          },
        );

        const { error, message, errorField } = forgotPasswordData.data;
        if (error) {
          setErrorMsg({ [errorField]: error });
          inputRef.current[errorField].focus();
          setForgotPassLoading(false);
          setNext(false);
        } else if (message) {
          setForgotPassword("");
          setModalOpen(false);
          localStorage.setItem(
            "forgotPassword",
            JSON.stringify(forgotPassword),
          );
          setForgotPassLoading(false);
          setNext(true);
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (next) {
      setTimeout(() => {
        navigate("/matchOtp");
      }, 1700);
    }
  }, [next, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputRef = useRef({});
  const [errorMsg, setErrorMsg] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg({});
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const data = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/login",
        {
          ...formData,
        },
      );

      const { message, error, errorField, loginData } = data.data;

      if (error) {
        setErrorMsg({ [errorField]: error });
        inputRef.current[errorField].focus();
        setLoading(false);
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (message) {
        dispatch(activeUser(loginData));
        localStorage.setItem("userInfo", JSON.stringify(loginData));
        setTimeout(() => {
          navigate("/");
        }, 500);
        setLoading(true);
        setErrorMsg({});
        setFormData({
          userName: "",
          email: "",
          password: "",
        });
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        const data = await axios.post(
          "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/login",
          {
            ...formData,
          },
        );

        const { message, error, errorField, loginData } = data.data;

        if (error) {
          setErrorMsg({ [errorField]: error });
          inputRef.current[errorField].focus();
          setLoading(false);
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (message) {
          dispatch(activeUser(loginData));
          localStorage.setItem("userInfo", JSON.stringify(loginData));
          setTimeout(() => {
            navigate("/");
          }, 500);
          setLoading(true);
          setErrorMsg({});
          setFormData({
            userName: "",
            email: "",
            password: "",
          });
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-dope to-secondary">
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
      />
      <Container>
        <div className="flex h-screen w-full items-center justify-center sm:h-full md:h-screen">
          <div className="relative flex w-full flex-col items-center justify-center gap-y-6 rounded bg-primary px-4 py-6 sm:w-4/5 md:w-2/3 md:px-6 md:py-10 lg:w-1/2 xl:w-1/3">
            <div className="w-full">
              <h1 className="text-center font-curs text-4xl text-pure">
                Task Mart
              </h1>
              <p className="pt-3 text-center font-nuni text-sm font-bold text-secondary">
                Login to Your Account
              </p>
            </div>

            <Input
              type="email"
              onchange={handleChangeFormData}
              onkeyup={handleKeyUp}
              name="email"
              placeholder="enter your email"
              value={formData.email}
              error={errorMsg.email}
              reference={(el) => (inputRef.current.email = el)}
            />

            <Input
              type="password"
              onchange={handleChangeFormData}
              onkeyup={handleKeyUp}
              name="password"
              placeholder="enter your password"
              value={formData.password}
              error={errorMsg.password}
              reference={(el) => (inputRef.current.password = el)}
            />

            <div
              onClick={openModal}
              className="absolute right-[30px] top-[255px] z-10 cursor-pointer font-nuni text-sm text-secondary transition-all ease-linear hover:underline md:right-[38px] md:top-[270px]"
            >
              Forgot password?
            </div>

            {/* ====================== Modal start ======================== */}
            <Modal isOpen={modalOpen} onClose={closeModal}>
              <h2 className="mb-6 text-center font-nuni text-3xl font-normal text-dark">
                Forgot Password?
              </h2>
              <p className="pb-2 text-left font-nuni text-base font-normal text-dark">
                we will be sent a confirmation code to your email address to
                reset the password.
              </p>

              <div className="my-7">
                <Input
                  type="email"
                  onchange={handleChangeForgotPassword}
                  onkeyup={handleKeyUpForgotPassword}
                  name="forgotPassword"
                  placeholder="enter your email address"
                  value={forgotPassword}
                  error={errorMsg.forgotPassword}
                  reference={(el) => (inputRef.current.forgotPassword = el)}
                />
              </div>

              {errorMsg.forgotPassword && (
                <div className="absolute bottom-[88px] left-[34px] font-nuni text-base font-normal text-danger">
                  {errorMsg.forgotPassword}
                </div>
              )}

              {!forgotPassLoading && (
                <Button
                  onClick={handleForgotPassword}
                  type="submit"
                  value="Forgot Password"
                />
              )}

              <ColorRing
                visible={forgotPassLoading}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperStyle={{ marginLeft: "163px", height: 47.98 }}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />

              <button
                onClick={closeModal}
                className="absolute right-2 top-2 text-red-500"
                title="Close"
              >
                <RxCross2 className="text-[26px]" />
              </button>
            </Modal>
            {/* ====================== Modal end ======================== */}

            {!loading && (
              <Button onClick={handleLogin} type="submit" value="Log In" />
            )}

            <ColorRing
              visible={loading}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{ height: 47.97 }}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />

            <AuthLink
              question="Don't have an account?"
              to="/signup"
              action="Click here"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
