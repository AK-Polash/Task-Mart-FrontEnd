import React from "react";
import { NavLink } from "react-router-dom";

const AuthLink = ({ question, to, action }) => {
  return (
    <>
      <div className="w-full text-center font-nuni text-sm font-normal text-pure">
        {question}{" "}
        <NavLink
          to={to}
          className="text-secondary transition-all ease-linear hover:underline"
        >
          {action}
        </NavLink>
      </div>
    </>
  );
};

export default AuthLink;
