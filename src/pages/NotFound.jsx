import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import Container from "../components/Container";

const NotFound = () => {
  return (
    <div className="bg-gradient-to-tr from-primary to-secondary">
      <Container>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-y-6">
          <span className="font-nuni text-5xl font-bold text-smoke">
            Not Found: 404
          </span>
          <NavLink
            to="/"
            className="flex items-center gap-x-1 rounded bg-secondary px-5 py-2 font-nuni text-lg font-bold text-smoke transition-all duration-100 ease-linear hover:shadow-lg"
          >
            <IoMdReturnLeft />
            <span>Go Home</span>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
