import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { assignedTask } from "../slices/taskSlice";
import avatar from "../assets/avatar.jpg";
import UserListItem from "./UserListItem";
import Input from "./Input";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const UserList = ({ smallScreen }) => {
  const taskInfo = useSelector((state) => state.taskData.taskInfo);
  const userInfo = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();

  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchArry, setSearchArry] = useState([]);
  const [isSelected, setIsSelected] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    const arr = [];
    setSearch(value);

    userList.filter((item) => {
      if (
        item.userName.toLowerCase().includes(value.toLocaleLowerCase()) &&
        userInfo.email !== item.email
      ) {
        arr.push(item);
      }
    });
    setSearchArry(arr);
  };

  const handleSelectUserList = (id) => {
    setIsSelected((prev) => ({ [id]: !prev[id] }));
    // to selecte multiple user:
    // setIsSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = () => {
    return Object.values(isSelected).every((value) => value === false);
  };

  const handleAssignTasks = async () => {
    setLoading(true);
    const userArray = [];
    Object.entries(isSelected).map(([key, value]) => {
      if (value === true) userArray.push(key);
    });

    try {
      const data = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/assignTask",
        {
          whoAssigned: userInfo.userId,
          whomAssigned: userArray[0],
          task: taskInfo._id,
        },
      );

      const { message, error } = data.data;
      if (error) {
        setLoading(false);
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (message) {
        setLoading(false);
        dispatch(assignedTask(null));
        setShow(false);
        setIsSelected({});
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await axios.get(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/auth/alluser",
        { headers: { user: userInfo.userId } },
      );

      const { error, users } = data.data;
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (users) {
        setUserList(users);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (taskInfo === null) {
      setIsSelected({});
      setShow(false);
    }
  }, [taskInfo]);

  return (
    <div
      className={
        smallScreen
          ? "fixed left-0 top-0 z-50 h-screen w-full bg-mix p-3"
          : "relative mt-5 rounded bg-mix p-3 xl:p-5"
      }
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <h3 className="pb-3 text-center font-nuni text-2xl font-normal text-smoke">
          User List
        </h3>
        <Input
          type="search"
          onchange={handleSearchChange}
          name="search"
          placeholder="Search for user"
          value={search}
        />

        {taskInfo !== null && taskInfo.assigned === true ? (
          <div className="mt-2 flex items-center justify-between gap-x-4">
            <RxCross2
              onClick={() => {
                dispatch(assignedTask(null));
                setShow(false);
                setIsSelected({});
              }}
              title="Cancel"
              className="shrink-0 cursor-pointer rounded border border-danger text-3xl text-danger"
            />
            <div className="font-nuni text-base text-smoke">
              <span>Task :</span> {taskInfo.title}
            </div>

            {show && !allChecked() ? (
              <>
                {!loading && (
                  <AiOutlineCheck
                    onClick={handleAssignTasks}
                    title="Assign Task"
                    className="shrink-0 cursor-pointer rounded border border-success text-3xl text-success"
                  />
                )}
                <ColorRing
                  visible={loading}
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
              </>
            ) : (
              <RxCross2 className="invisible rounded border border-danger text-3xl text-danger" />
            )}
          </div>
        ) : (
          <RxCross2 className="invisible mt-2 rounded border border-danger text-3xl text-danger" />
        )}
      </div>

      <div className="mt-4 flex h-[335px] flex-col gap-y-3.5 overflow-y-scroll xl:h-[365px]">
        {searchArry.length > 0 ? (
          searchArry.map((item) => (
            <UserListItem
              key={item._id}
              photoUrl={item.photoUrl ? item.photoUrl : avatar}
              name={item.userName}
              email={item.email}
              onclick={() => {
                handleSelectUserList(item._id);
                setShow(true);
              }}
              isSelected={isSelected[item._id]}
            />
          ))
        ) : userList.length > 0 ? (
          userList.map(
            (item) =>
              userInfo !== null &&
              userInfo.email !== item.email && (
                <UserListItem
                  key={item._id}
                  photoUrl={item.photoUrl ? item.photoUrl : avatar}
                  name={item.userName}
                  email={item.email}
                  onclick={() => {
                    handleSelectUserList(item._id);
                    setShow(true);
                  }}
                  isSelected={isSelected[item._id]}
                />
              ),
          )
        ) : (
          <div className="text-center font-nuni text-lg font-semibold text-danger">
            Empty User List!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
