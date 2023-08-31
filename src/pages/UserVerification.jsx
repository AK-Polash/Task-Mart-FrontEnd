import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/Container";
import { ColorRing } from "react-loader-spinner";
import { TiTickOutline } from "react-icons/ti";
import { BiError } from "react-icons/bi";

const UserVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const token = window.location.search.split("=")[1];

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await axios.post(
          "http://localhost:8000/api/v1/auth/userVerification",
          {
            token: token,
          },
        );

        const { error, message } = data.data;

        if (error) {
          setErrorMsg(error);
          setVerificationStatus("");
        } else if (message) {
          setVerificationStatus(message);
          setErrorMsg("");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="bg-gradient-to-r from-dope to-secondary">
      <Container>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-y-6 rounded bg-primary px-4 py-6 sm:w-4/5 md:w-2/3 md:px-6 md:py-10 lg:w-1/2 xl:w-1/3">
            <div className="w-full">
              <h1 className="text-center font-curs text-4xl text-pure">
                Task Mart
              </h1>
              <p className="pt-3 text-center font-nuni text-sm font-bold text-secondary">
                Thaks for Being With Us
              </p>
            </div>
            <h2 className="font-dm text-2xl font-bold text-secondary">
              Account Verification
            </h2>

            {loading ? (
              <div className="flex items-center">
                <p className="font-nuni text-base font-normal text-pure">
                  Verifying account...
                </p>
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            ) : (
              <>
                {errorMsg ? (
                  <div className="mt-1 flex items-center gap-x-1">
                    <p className="font-nuni text-base font-normal text-danger">
                      {errorMsg}
                    </p>
                    <BiError className="text-xl text-danger" />
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1">
                    <p className="font-nuni text-base font-normal text-pure">
                      {verificationStatus}
                    </p>
                    <TiTickOutline className="text-xl text-pure" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserVerification;
