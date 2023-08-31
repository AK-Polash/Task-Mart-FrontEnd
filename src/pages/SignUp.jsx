import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLink from "../components/AuthLink";

const SignUp = () => {
  const user = useSelector((state) => state.userData.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
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

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        {
          ...formData,
        },
      );

      const { message, error, errorField } = data.data;

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

        setTimeout(() => {
          navigate("/login");
        }, 1300);
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
          "http://localhost:8000/api/v1/auth/signup",
          {
            ...formData,
          },
        );

        const { message, error, errorField } = data.data;

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

          setTimeout(() => {
            navigate("/login");
          }, 500);
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
          <div className="flex w-full flex-col items-center justify-center gap-y-6 rounded bg-primary px-4 py-6 sm:w-4/5 md:w-2/3 md:px-6 md:py-10 lg:w-1/2 xl:w-1/3">
            <div className="w-full">
              <h1 className="text-center font-curs text-4xl text-pure">
                Task Mart
              </h1>
              <p className="pt-3 text-center font-nuni text-sm font-bold text-secondary">
                Sign Up & Store Your Tasks
              </p>
            </div>

            <Input
              type="text"
              onchange={handleChangeFormData}
              onkeyup={handleKeyUp}
              name="userName"
              placeholder="enter your username"
              value={formData.userName}
              error={errorMsg.userName}
              reference={(el) => (inputRef.current.userName = el)}
            />
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

            {!loading && (
              <Button onClick={handleSignUp} type="submit" value="Sign Up" />
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
              question="Already have an account?"
              to="/login"
              action="Click here"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
