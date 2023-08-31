import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import TaskField from "../components/TaskField";
import UserList from "../components/UserList";
import UserProfile from "../components/UserProfile";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const taskInfo = useSelector((state) => state.taskData.taskInfo);

  useEffect(() => {
    const resizeWindow = (e) => {
      setInnerWidth(e.target.innerWidth);
    };

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [innerWidth]);

  return (
    <div className="bg-gradient-to-tr from-primary to-secondary pt-16">
      <Container>
        <div className="flex w-full flex-col justify-between gap-x-6 xl:flex-row">
          <div className="flex xl:w-1/5">
            <UserProfile />
          </div>

          <div className="flex w-full justify-between md:gap-x-3 xl:w-4/5 xl:gap-x-6">
            <div className="h-[calc(100vh-68px) w-full md:w-[60%] lg:w-[62%]">
              {innerWidth < 768 && <TaskField />}
              <TaskItem />
            </div>
            <div className="md:w-[40%] lg:w-[38%]">
              {innerWidth >= 768 && <TaskField />}
              {innerWidth >= 768 ? (
                <UserList smallScreen={false} />
              ) : (
                taskInfo &&
                taskInfo.assigned === true && <UserList smallScreen={true} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
