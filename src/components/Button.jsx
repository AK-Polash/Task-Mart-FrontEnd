import React from "react";

const Button = ({ onClick, type, value }) => {
  return (
    <>
      {type ? (
        <button
          className="w-full rounded-3xl border-none bg-secondary py-3 font-nuni text-base text-smoke transition-all duration-100 ease-linear hover:shadow-xl"
          onClick={onClick}
          type={type}
        >
          {value}
        </button>
      ) : (
        <button
          className="w-full rounded-3xl border-none bg-secondary py-3 font-nuni text-base text-smoke transition-all duration-100 ease-linear hover:shadow-xl"
          onClick={onClick}
        >
          {value}
        </button>
      )}
    </>
  );
};

export default Button;
