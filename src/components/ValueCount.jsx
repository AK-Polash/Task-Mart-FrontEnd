import React from "react";

const ValueCount = (props) => {
  return (
    <div className="flex items-center gap-x-2 font-nuni text-base font-normal text-smoke">
      {props.icon && <props.icon />}
      <span>{props.title} -</span>
      <span>{props.value}</span>
    </div>
  );
};

export default ValueCount;
