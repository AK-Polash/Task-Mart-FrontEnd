import React from "react";
import { useSelector } from "react-redux";
import ValueCount from "./ValueCount";
import avatar from "../assets/avatar.jpg";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";
import { CgClipboard } from "react-icons/cg";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.userData.userInfo);

  return (
    <div className="w-full rounded pt-5">
      <div className="flex items-center gap-x-6">
        <div className="w-[10%] overflow-hidden xl:w-2/6">
          <img
            className="h-auto w-full rounded object-cover"
            src={avatar}
            alt="profile img"
            loading="lazy"
          />
        </div>
        <div className="w-4/6">
          <h3 className="font-nuni text-xl font-bold text-smoke">
            {userInfo !== null && userInfo.userName}
          </h3>
          <div className="pb-1 font-nuni text-base font-normal text-smoke">
            {userInfo !== null && userInfo.email}
          </div>
          <ValueCount icon={CgClipboard} title="Toatl" value="15" />
          <ValueCount
            icon={MdOutlinePendingActions}
            title="Remaining"
            value="3"
          />
          <ValueCount icon={MdTaskAlt} title="Completed" value="12" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
