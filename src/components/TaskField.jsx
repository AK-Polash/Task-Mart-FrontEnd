import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignedTask } from "../slices/taskSlice";
import Input from "../components/Input";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const TaskField = () => {
  const user = useSelector((state) => state.userData.userInfo);
  const taskInfo = useSelector((state) => state.taskData.taskInfo);
  const dispatch = useDispatch();

  const inputRef = useRef({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
    taskId: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg({});
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/addTask",
        {
          ...formData,
          user: user.userId,
        },
      );

      const { error, errorField, message } = data.data;

      if (error) {
        setLoading(false);
        if (errorField) {
          setErrorMsg({ [errorField]: error });
          inputRef.current[errorField].focus();
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
        } else {
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
        }
      } else if (message) {
        setLoading(false);
        setFormData({
          title: "",
          description: "",
          user: "",
          taskId: "",
        });
        setErrorMsg({});
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

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      if (taskInfo !== null && taskInfo.edit === true) {
        try {
          const data = await axios.post(
            "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/editTask",
            {
              ...formData,
              taskId: taskInfo._id,
            },
          );

          const { error, errorField, message } = data.data;
          if (error) {
            setLoading(false);
            if (errorField) {
              setErrorMsg({ [errorField]: error });
              inputRef.current[errorField].focus();
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
            } else {
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
            }
          } else if (message) {
            dispatch(assignedTask(null));
            setEdit(false);
            setLoading(false);
            setFormData({
              title: "",
              description: "",
              user: "",
              taskId: "",
            });
            setErrorMsg({});
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
      } else {
        try {
          const data = await axios.post(
            "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/addTask",
            {
              ...formData,
              user: user.userId,
            },
          );

          const { error, errorField, message } = data.data;

          if (error) {
            setLoading(false);
            if (errorField) {
              setErrorMsg({ [errorField]: error });
              inputRef.current[errorField].focus();
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
            } else {
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
            }
          } else if (message) {
            setLoading(false);
            setFormData({
              title: "",
              description: "",
              user: "",
            });
            setErrorMsg({});
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
      }
    }
  };

  const handleEditTask = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        "https://task-mart-backend-7ffk6vmmm-ak-polash.vercel.app/api/v1/task/editTask",
        {
          ...formData,
          taskId: taskInfo._id,
        },
      );

      const { error, errorField, message } = data.data;
      if (error) {
        setLoading(false);
        if (errorField) {
          setErrorMsg({ [errorField]: error });
          inputRef.current[errorField].focus();
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
        } else {
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
        }
      } else if (message) {
        dispatch(assignedTask(null));
        setEdit(false);
        setLoading(false);
        setFormData({
          title: "",
          description: "",
          user: "",
          taskId: "",
        });
        setErrorMsg({});
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
    // else er jaygate age else if (taskInfo !== null && taskInfo.edit === false) chilo
    if (taskInfo !== null && taskInfo.edit === true) {
      setFormData({
        ...formData,
        title: taskInfo.title,
        description: taskInfo.description,
      });
      setErrorMsg({});
      setEdit(true);
    } else {
      setFormData({
        ...formData,
        title: "",
        description: "",
      });
      setErrorMsg({});
      setEdit(false);
    }
  }, [taskInfo]);

  return (
    <div className="w-full rounded pt-5">
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
      <div className="flex items-center gap-x-2 xl:justify-center">
        <TfiWrite className="text-2xl text-smoke" />
        <h3 className="font-nuni text-2xl font-normal text-smoke">
          Insert Your Task Here
        </h3>
      </div>
      <div className="relative flex flex-col gap-y-2 pt-4 xl:p-4">
        <Input
          type="text"
          onchange={handleChangeFormData}
          onkeyup={handleKeyUp}
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          error={errorMsg.title}
          reference={(el) => (inputRef.current.title = el)}
        />
        <Input
          type="text"
          onchange={handleChangeFormData}
          onkeyup={handleKeyUp}
          name="description"
          placeholder="Enter task description..."
          value={formData.description}
          error={errorMsg.description}
          reference={(el) => (inputRef.current.description = el)}
        />

        {!loading && edit ? (
          <div className="flex items-center gap-x-4">
            {/* <BiEdit
              className="absolute bottom-4 right-2 cursor-pointer text-4xl text-mix xl:bottom-8 xl:right-5"
              title="Update Task"
              onClick={handleEditTask}
            /> */}

            <RxCross2
              onClick={() => {
                dispatch(assignedTask(null));
                setEdit(false);
              }}
              title="Cancel Edit"
              className="cursor-pointer rounded border border-danger bg-secondary text-3xl text-danger"
            />

            <AiOutlineCheck
              onClick={handleEditTask}
              title="Update Task"
              className="cursor-pointer rounded border border-success bg-secondary text-3xl text-success"
            />
          </div>
        ) : (
          !loading &&
          !edit && (
            <MdOutlinePostAdd
              className="absolute bottom-4 right-2 cursor-pointer text-4xl text-mix xl:bottom-8 xl:right-5"
              title="Add Task"
              onClick={handleAddTask}
            />
          )
        )}

        <span className="absolute bottom-4 right-2 xl:bottom-8 xl:right-5">
          <ColorRing
            visible={loading}
            height="35.99"
            width="35.99"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </span>
      </div>
    </div>
  );
};

export default TaskField;
