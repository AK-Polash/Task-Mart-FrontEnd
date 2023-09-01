import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignedTask } from "../slices/taskSlice";
import axios from "axios";
import { TbCalendarQuestion } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import tz from "moment-timezone";

const TaskItem = () => {
  const userInfo = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();
  const modalRefs = {};
  const [allTasks, setAllTasks] = useState([]);
  const [showModal, setShowModal] = useState({});

  const handleToggleModal = (id) => {
    setShowModal((prev) => ({ [id]: !prev[id] }));
  };

  const handleDeleteTask = async (taskItem) => {
    try {
      const data = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/deleteTask",
        {
          taskId: taskItem._id,
          userId: taskItem.user,
          deleteAs:
            taskItem.send === true || taskItem.received === true
              ? "assigned"
              : "normal",
        },
      );

      const { error, message } = data.data;
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
      } else if (message) {
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

  // For "Pending" --> "Completed"
  const handleCompleteTask = async (taskItem) => {
    try {
      const request = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/updateTaskStatus",
        { taskId: taskItem._id, status: "Completed" },
      );

      const { error, message } = request.data;
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
      } else if (message) {
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

  // For "Completed" --> "Pending"
  const handleIncompleteTask = async (taskItem) => {
    try {
      const request = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/updateTaskStatus",
        { taskId: taskItem._id, status: "Pending" },
      );

      const { error, message } = request.data;
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
      } else if (message) {
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

  // For Dropdown menu:
  useEffect(() => {
    const handleOutsideClick = (e, id) => {
      if (modalRefs[id] && !modalRefs[id].contains(e.target)) {
        setShowModal(() => ({ [id]: false }));
      }
    };

    Object.keys(showModal).map((id) => {
      document.body.addEventListener("click", (e) => handleOutsideClick(e, id));
    });

    return () => {
      Object.keys(showModal).map((id) => {
        document.body.removeEventListener("click", (e) =>
          handleOutsideClick(e, id),
        );
      });
    };
  }, [showModal]);

  // Get all Tasks:
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const receivedData = await axios.get(
          "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/allTask",
          {
            headers: {
              user: userInfo.userId,
            },
          },
        );

        const { error, message, data } = receivedData.data;
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
        } else if (message) {
          setAllTasks((prev) => {
            const prevArr = prev.map((item) => item._id);
            const unAssignedTaskArray = data.filter(
              (item) => !prevArr.includes(item._id),
            );

            return [...prev, ...unAssignedTaskArray];
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllTasks();
  }, []);

  // Get all Assigned Tasks:
  useEffect(() => {
    const getAllAssignedTasks = async () => {
      const request = await axios.get(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/allAssignedTask",
      );

      const { error, message, data } = request.data;
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
      } else if (message) {
        data.map((item) => {
          // As Task Receiver:
          if (userInfo.userId === item.whomAssigned._id) {
            const newTask = {
              ...item.task,
              received: true,
              senderName: item.whoAssigned.userName,
            };
            setAllTasks((prev) => [...prev, newTask]);
          }
          // As Task Sender:
          else if (userInfo.userId === item.whoAssigned._id) {
            const newTask = {
              ...item.task,
              send: true,
              receiverName: item.whomAssigned.userName,
            };
            setAllTasks((prev) => {
              const duplicate = prev.filter((task) => task._id !== newTask._id);
              return [...duplicate, newTask];
            });
          }
        });
      }
    };

    getAllAssignedTasks();
  }, []);

  return (
    <div className="mt-5 flex flex-col-reverse gap-y-6">
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

      {allTasks.length > 0 ? (
        allTasks.map((item) => (
          <div
            key={item._id}
            className="relative rounded bg-gradient-to-tr from-secondary to-mix p-5"
          >
            <div className="mx-2">
              <div className="flex items-center gap-x-1 pt-2">
                <GoDotFill className="shrink-0 text-base text-smoke" />
                <h6 className="pr-5 text-justify font-nuni text-xl font-medium text-smoke">
                  {item.title}
                </h6>
              </div>
              <div className="pb-4 pt-2 text-justify font-nuni text-base font-normal text-valin">
                {item.description}
              </div>
              <div className="flex items-center font-nuni text-sm font-bold text-smoke">
                <TbCalendarQuestion className="pr-1 text-xl" />
                <span>Status</span>
                <span className="mx-2">-</span>
                <span
                  className={`font-light italic ${
                    item.status === "Completed" ? "text-success" : "text-danger"
                  } `}
                >
                  {item.status}
                </span>
              </div>

              {item.received ? (
                <div className="flex items-center gap-x-1 pt-1">
                  <IoBriefcaseOutline className="text-sm text-smoke" />
                  <p className="font-nuni text-sm font-semibold text-smoke">
                    <span>Assigned By -</span>{" "}
                    <span className="font-light">{item.senderName}</span>
                  </p>
                </div>
              ) : item.send ? (
                <div className="flex items-center gap-x-1 pt-1">
                  <IoBriefcaseOutline className="text-sm text-smoke" />
                  <p className="font-nuni text-sm font-semibold text-smoke">
                    <span>Assigned To -</span>{" "}
                    <span className="font-light">{item.receiverName}</span>
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className="pt-2 text-center font-nuni text-xs font-normal text-valin">
                {moment(item.created).tz("Asia/Tokyo").fromNow()}
              </div>
            </div>

            {/* ========================== Dropdown Menu Start ========================== */}
            <div ref={(ref) => (modalRefs[item._id] = ref)}>
              <HiDotsVertical
                onClick={() => handleToggleModal(item._id)}
                className="absolute right-3 top-4 cursor-pointer text-2xl text-flat"
              />

              <ul
                className={`absolute right-9 w-28 rounded bg-flat py-2 font-nuni text-base font-normal text-mix transition-all duration-75 ease-linear ${
                  showModal[item._id]
                    ? "visible top-5 opacity-100"
                    : "invisible top-3 opacity-0"
                }`}
              >
                {!item.send && item.status === "Pending" && (
                  <>
                    <li
                      onClick={() => {
                        dispatch(assignedTask(null));
                        setShowModal({});
                        handleCompleteTask(item);
                      }}
                      className="cursor-pointer bg-flat px-3 transition-all duration-75 ease-linear hover:bg-primary hover:text-flat"
                    >
                      Complete
                    </li>

                    {!item.received && (
                      <li
                        onClick={() => {
                          dispatch(
                            assignedTask({
                              ...item,
                              edit: false,
                              assigned: true,
                            }),
                          );
                          setShowModal({});
                        }}
                        className="cursor-pointer bg-flat px-3 transition-all duration-75 ease-linear hover:bg-primary hover:text-flat"
                      >
                        Assign
                      </li>
                    )}
                  </>
                )}

                {item.status === "Completed" && (
                  <li
                    onClick={() => {
                      dispatch(assignedTask(null));
                      setShowModal({});
                      handleIncompleteTask(item);
                    }}
                    className="cursor-pointer bg-flat px-3 transition-all duration-75 ease-linear hover:bg-primary hover:text-flat"
                  >
                    Incomplete
                  </li>
                )}

                {item.status !== "Completed" && !item.received && (
                  <li
                    onClick={() => {
                      dispatch(
                        assignedTask({ ...item, edit: true, assigned: false }),
                      );
                      setShowModal({});
                    }}
                    className="cursor-pointer bg-flat px-3 transition-all duration-75 ease-linear hover:bg-primary hover:text-flat"
                  >
                    Edit
                  </li>
                )}

                <li
                  onClick={() => {
                    dispatch(assignedTask(null));
                    setShowModal({});
                    handleDeleteTask(item);
                  }}
                  className="cursor-pointer bg-flat px-3 transition-all duration-75 ease-linear hover:bg-primary hover:text-flat"
                >
                  Remove
                </li>
              </ul>
            </div>
            {/* ========================== Dropdown Menu End ========================== */}
          </div>
        ))
      ) : (
        <div className="rounded bg-smoke p-1 text-center font-nuni text-xl font-semibold text-danger">
          No task added yet!
        </div>
      )}
    </div>
  );
};

export default TaskItem;
