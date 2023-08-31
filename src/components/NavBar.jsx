import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { assignedTask } from "../slices/taskSlice";
import { MdNotificationsNone } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Container from "./Container";

const NavBar = ({ hasScrolled }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(activeUser(null));
    dispatch(assignedTask(null));
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div
      className={
        hasScrolled
          ? "fixed z-40 w-full bg-mix py-3 shadow-xl transition-all duration-150 ease-linear"
          : "fixed z-40 w-full bg-mix py-4 shadow-none transition-all duration-150 ease-linear"
      }
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="w-3/6">
            <h2 className="font-curs text-2xl text-pure md:text-3xl">
              Task
              <span
                className={
                  hasScrolled
                    ? "text-danger transition-all duration-150 ease-linear"
                    : "transition-all duration-150 ease-linear"
                }
              >
                {" "}
                Mart
              </span>
            </h2>
          </div>
          <ul className="flex w-3/6 items-center justify-end gap-x-7">
            <li>
              <MdNotificationsNone
                title="Notification"
                className="cursor-pointer text-3xl text-pure transition-all duration-100 hover:text-primary md:text-4xl"
                // onClick={}
              />
            </li>
            <li>
              <TbLogout
                title="Logout"
                className="cursor-pointer text-3xl text-pure transition-all duration-100 hover:text-primary md:text-4xl"
                onClick={handleLogout}
              />
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
