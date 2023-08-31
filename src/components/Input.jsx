import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const Input = ({
  type,
  onchange,
  onkeyup,
  name,
  placeholder,
  value,
  error,
  reference,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {type === "text" ? (
        <input
          className={
            error
              ? "mb-2 w-full rounded border px-4 py-3 text-danger outline-none ring-1 ring-danger"
              : "mb-2 w-full rounded border px-4 py-3 text-secondary outline-none transition-all duration-100 ease-linear focus:ring-1 focus:ring-secondary"
          }
          type="text"
          onChange={onchange}
          onKeyUp={onkeyup}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={reference}
        />
      ) : type === "email" ? (
        <input
          className={
            error
              ? "mb-2 w-full rounded border px-4 py-3 text-danger outline-none ring-1 ring-danger"
              : "mb-2 w-full rounded border px-4 py-3 text-secondary outline-none transition-all duration-100 ease-linear focus:ring-1 focus:ring-secondary"
          }
          type="text"
          onChange={onchange}
          onKeyUp={onkeyup}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={reference}
        />
      ) : type === "password" ? (
        <span className="relative w-full">
          <input
            className={
              error
                ? "mb-2 w-full rounded border px-4 py-3 text-danger outline-none ring-1 ring-danger"
                : "mb-2 w-full rounded border px-4 py-3 text-secondary outline-none transition-all duration-100 ease-linear focus:ring-1 focus:ring-secondary"
            }
            type={show ? "text" : "password"}
            onChange={onchange}
            onKeyUp={onkeyup}
            name={name}
            placeholder={placeholder}
            value={value}
            ref={reference}
          />

          {show ? (
            <AiOutlineEye
              onClick={() => setShow(!show)}
              className="absolute right-4 top-[14px] cursor-pointer text-2xl"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setShow(!show)}
              className="absolute right-4 top-[14px] cursor-pointer text-2xl"
            />
          )}
        </span>
      ) : type === "search" ? (
        <>
          <input
            className={
              error
                ? "mb-2 w-full rounded border px-4 py-3 text-danger outline-none ring-1 ring-danger"
                : "mb-2 w-full rounded border px-4 py-3 text-secondary outline-none transition-all duration-100 ease-linear focus:ring-1 focus:ring-secondary"
            }
            type="search"
            onChange={onchange}
            onKeyUp={onkeyup}
            name={name}
            placeholder={placeholder}
            value={value}
            ref={reference}
          />

          {!value && (
            <BiSearch className="absolute right-6 top-[70px] text-2xl xl:right-8 xl:top-[77px]" />
          )}
        </>
      ) : type === "textArea" ? (
        ""
      ) : (
        ""
      )}
    </>
  );
};

export default Input;
