import React from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { useSelector } from "react-redux";

const UserListItem = ({ photoUrl, name, email, onclick, isSelected }) => {
  const taskInfo = useSelector((state) => state.taskData.taskInfo);

  return (
    <div className="flex items-center justify-between gap-x-4 rounded bg-secondary p-3">
      <div className="w-[15%]">
        <div className="h-10 w-10 overflow-hidden rounded-full xl:h-14 xl:w-14">
          <img
            className="h-full w-full object-cover"
            src={photoUrl}
            loading="lazy"
            alt="Profile"
          />
        </div>
      </div>
      <div className="w-[75%] overflow-hidden">
        <h4 className="font-nuni text-base font-normal text-smoke xl:text-lg">
          {name}
        </h4>
        <span className="font-nuni text-sm font-normal text-valin">
          {email && email}
        </span>
      </div>

      <div className="w-[10%]">
        {taskInfo !== null && taskInfo.assigned === true ? (
          isSelected ? (
            <MdOutlineCheckBox
              onClick={onclick}
              className="cursor-pointer text-3xl text-smoke"
            />
          ) : (
            <MdOutlineCheckBoxOutlineBlank
              onClick={onclick}
              className="cursor-pointer text-3xl text-smoke"
            />
          )
        ) : (
          <MdOutlineCheckBoxOutlineBlank className="invisible cursor-pointer text-3xl text-pure" />
        )}
      </div>
    </div>
  );
};

export default UserListItem;
