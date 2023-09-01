import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from "../components/Container";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const localEmail = JSON.parse(localStorage.getItem("forgotPassword"));
  const inputRef = useRef({});

  const handleConfirmOtp = async () => {
    setLoading(true);
    const otpData = await axios.post(
      "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/matchOtp",
      {
        otp: otp,
        forgotPassword: localEmail,
      },
    );

    const { error, message, errorField } = otpData.data;

    if (error) {
      setErrorMsg({ [errorField]: error });
      inputRef.current[errorField].focus();
      setLoading(false);
      setNext(false);
    } else if (message) {
      setLoading(false);
      setErrorMsg({});
      setOtp("");
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
      setNext(true);
    }
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const otpData = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/matchOtp",
        {
          otp: otp,
          forgotPassword: localEmail,
        },
      );

      const { error, message, errorField } = otpData.data;

      if (error) {
        setErrorMsg({ [errorField]: error });
        inputRef.current[errorField].focus();
        setLoading(false);
        setNext(false);
      } else if (message) {
        setLoading(false);
        setErrorMsg({});
        setOtp("");
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
        setNext(true);
      }
    }
  };

  useEffect(() => {
    if (next) {
      setTimeout(() => {
        navigate("/resetPassword");
      }, 1700);
    }
  }, [next, navigate]);

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
        <div className="flex h-screen w-full items-center justify-center">
          <div className="relative flex w-full flex-col items-center justify-center gap-y-7 rounded bg-primary px-4 py-6 sm:w-4/5 md:w-2/3 md:px-6 md:py-10 lg:w-1/2 xl:w-1/3">
            <div className="w-full">
              <h1 className="text-center font-curs text-4xl text-pure">
                Task Mart
              </h1>
              <p className="pt-3 text-center font-nuni text-sm font-bold text-secondary">
                Match Your OTP Code
              </p>
            </div>

            <Input
              type="text"
              onchange={(e) => {
                setOtp(e.target.value);
                setErrorMsg({});
              }}
              onkeyup={handleKeyUp}
              name="otp"
              placeholder="Enter Your OTP here"
              value={otp}
              error={errorMsg.otp}
              reference={(el) => (inputRef.current.otp = el)}
            />

            {errorMsg && (
              <div className="absolute bottom-[94px] left-[30px] font-nuni text-base font-normal text-danger">
                {errorMsg.otp}
              </div>
            )}

            {!loading && (
              <Button
                onClick={handleConfirmOtp}
                type="submit"
                value="Match Otp"
              />
            )}
            <ColorRing
              visible={loading}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{ height: "47.98px" }}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MatchOtp;
