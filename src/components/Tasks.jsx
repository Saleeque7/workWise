import React, { useCallback, useEffect, useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdGroup,
  MdPerson,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userAxiosInstance } from "../utils/api/PrivateAxios";
import {
  browseTaskApi,
  editmemberStatusTaskApi,
  editTaskApi,
  joinTaskApi,
  leaveTaskApi,
  removeMemberApi,
} from "../utils/api/api";
import { Pagination } from "./Pagination";
import { useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { toast, Slide } from "react-toastify";
import { Transition } from "./Transition";
import ExpandModal from "./expandModal";
import EditTaskModal from "./editTaskModal";

export default function Tasks({activeTab}) {
  const user = useSelector((state) => state.persisted.user.user);

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expandTask, setTaskToExapand] = useState(null);
  const [taskIdToJoin, setTaskIdToJoin] = useState(null);
  const [memeberIdToremove, setMemeberIdToremove] = useState(null);
  const [memeberNameToremove, setMemeberNameToremove] = useState(null);
  const [enums, setEnums] = useState(null);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);
  const [EditModalOpen, setditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async (page = 1, limit = 6) => {
    try {
      const response = await userAxiosInstance.get(browseTaskApi, {
        params: { page, limit, activeTab },
      });
      console.log(response.data, "response");

      if (response.data) {
        setTasks(response.data.tasks);
        setTotalPages(response.data.totalPages);
        setEnums(response.data.memberStatusEnum);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage, fetchTasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleJoinTask = async (id) => {
    setTaskIdToJoin(id);
    setIsModalOpen(true);
  };
  const handleLeaveTask = async (id) => {
    if (isExpandModalOpen) {
      setIsExpandModalOpen(false);
    }
    setTaskIdToJoin(id);
    setIsLeaveModalOpen(true);
  };

  const handleJoin = async () => {
    try {
      const res = await userAxiosInstance.put(`${joinTaskApi}/${taskIdToJoin}`)
      console.log("Task joined successfully:", res.data);
      if (res.data && res.data.success) {
        toast.success(res.data?.message, {
          transition: Slide,
          autoClose: 1000,
        });
        setIsModalOpen(false);
        setTaskIdToJoin(null);
        fetchTasks(currentPage);
      }
    } catch (error) {
      console.error("Error in joining task:", error);
      toast.error(error.response.data?.message, {
        transition: Slide,
        autoClose: 1000,
      });
      setIsModalOpen(false);
      setTaskIdToJoin(null);
    }
  };
  const handleLeave = async () => {
    try {
      const res = await userAxiosInstance.put(`${leaveTaskApi}/${taskIdToJoin}`)

      console.log("Task leave successfully:", res.data);
      if (res.data && res.data.success) {
        toast.success(res.data?.message, {
          transition: Slide,
          autoClose: 1000,
        });
        setIsLeaveModalOpen(false);
        setTaskIdToJoin(null);
        fetchTasks(currentPage);
      }
    } catch (error) {
      console.error("Error in leave task:", error);
      toast.error(error.response.data?.message, {
        transition: Slide,
        autoClose: 1000,
      });
      setIsLeaveModalOpen(false);
      setTaskIdToJoin(null);
    }
  };

  const ICONS = {
    High: <MdKeyboardDoubleArrowUp />,
    Medium: <MdKeyboardArrowUp />,
    Low: <MdKeyboardArrowDown />,
  };

  const toggleReadMore = (taskId) => {
    setExpandedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const showExpand = (id, task) => {
    setTaskIdToJoin(id);
    setTaskToExapand(task);
    setIsExpandModalOpen(true);
  };
  const handleRemove = (memeberId, taskId, name) => {
    if (isExpandModalOpen) {
      setIsExpandModalOpen(false);
    }
    setTaskIdToJoin(taskId);
    setMemeberIdToremove(memeberId);
    setMemeberNameToremove(name);
    setIsRemoveModalOpen(true);
  };

  const handleSaveStatusChange = async (updatedStatuses) => {
    try {
      const response = await userAxiosInstance.put(`${editmemberStatusTaskApi}/${expandTask._id}`, {
        statuses: updatedStatuses,
      });
      console.log("Task statuses updated", response.data);

      if (response.data && response.data.success) {
        toast.success(response.data?.message, {
          transition: Slide,
          autoClose: 1000,
        });
      }

      const updatedTasks = tasks.map((task) => {
        if (task._id === expandTask._id) {
          return {
            ...task,
            members: task.members.map((member) => {
              const updatedMember = updatedStatuses.find(
                (m) => m.memberId === member.member._id
              );
              if (updatedMember) {
                return { ...member, memberStatus: updatedMember.status };
              }
              return member;
            }),
          };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task statuses:", error);
    }
  };

  const handleRemoveMember = async () => {
    try {
      const response = await userAxiosInstance.put(`${removeMemberApi}/${taskIdToJoin}/${memeberIdToremove}`)
      if (response.data && response.data.success) {
        toast.success(response.data?.message, {
          transition: Slide,
          autoClose: 1000,
        });
        setIsRemoveModalOpen(false);
        setTaskIdToJoin(null);
        setMemeberIdToremove(null);
        fetchTasks(currentPage);
      }
    } catch (error) {
      console.error("Error updating task statuses:", error);
      toast.error(error.response.data?.message, {
        transition: Slide,
        autoClose: 1000,
      });
      setIsRemoveModalOpen(false);
      setTaskIdToJoin(null);
      setMemeberIdToremove(null);
    }
  };

  const handleEdit = (id, task) => {
    setTaskIdToJoin(id);
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const EditTask = async (updatedTaskData) => {
    try {
      const response = await userAxiosInstance.put(`${editTaskApi}/${taskIdToJoin}`, {
        task: updatedTaskData,
      });
      if (response.data && response.data.success) {
        toast.success(response.data?.message, {
          transition: Slide,
          autoClose: 1000,
        });
        setIsEditModalOpen(false);
        setditModalOpen(false);
        setTaskIdToJoin(null);
        fetchTasks(currentPage);
      }
    } catch (error) {
      console.error("Error updating task statuses:", error);
      toast.error(error.response.data?.message, {
        transition: Slide,
        autoClose: 1000,
      });
      setIsEditModalOpen(false);
      setditModalOpen(fasle);
      setTaskIdToJoin(null);
    }
  };

  return (
    <>
      <Transition>
        <div className="min-h-[90vh] p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tasks List</h2>
            {tasks.length !== 0 && (
              <button
                className="flex items-center text-gray-500 hover:text-gray-900"
                onClick={() => navigate("/home/add_task")}
              >
                <MdAdd className="mr-1" />
                Add Task
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="w-full h-[250px] bg-white shadow-md p-4 rounded flex flex-col"
                >
                  <div className="flex flex-wrap justify-between mb-2">
                    <div className="flex items-center font-semibold mb-1">
                      {task.owner._id === user._id ? (
                        <span className="text-OwnerColor flex items-center">
                          <MdPerson className="mr-1" /> Owner
                        </span>
                      ) : task.owner._id !== user._id &&
                        task.members.some(
                          (m) =>
                            m.member?._id.toString() === user._id.toString()
                        ) ? (
                        <span className="text-OwnerColor flex items-center">
                          <MdPerson className="mr-1" /> Member
                        </span>
                      ) : (
                        <span
                          className="text-OwnerColor flex items-center cursor-pointer"
                          onClick={() => handleJoinTask(task._id)}
                        >
                          <MdAdd className="mr-1" /> Join
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center flex-wrap">
                      <span
                        className={`text-sm font-medium mr-2 ${
                          task.status === "completed"
                            ? "text-green-600"
                            : task.status === "not-available"
                            ? "text-red-600"
                            : "text-activeColor"
                        }`}
                      >
                        {task.status}
                      </span>
                      <div
                        className={`flex items-center px-2 py-1 rounded ${getPriorityColor(
                          task?.priority
                        )}`}
                      >
                        {ICONS[task?.priority]}
                        <span className="ml-1">{task?.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-borderColor truncate">
                      {task?.title}
                    </h3>
                  </div>

                  <div className="flex-1 mt-2">
                    <div
                      className={`text-sm text-gray-600 mt-2 ${
                        expandedTasks[task._id]
                          ? "max-h-none"
                          : "max-h-20 overflow-hidden"
                      }`}
                      style={{
                        position: "relative",
                        whiteSpace: expandedTasks[task._id]
                          ? "pre-wrap"
                          : "nowrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {task.overView}
                    </div>
                    {task.overView.length > 50 && (
                      <button
                        onClick={() => toggleReadMore(task._id)}
                        className="text-blue-500 text-xs hover:underline mt-1"
                      >
                        {expandedTasks[task._id] ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    {task.owner._id === user._id ? (
                      <button
                        className="flex flex-col items-center text-gray-600 hover:text-gray-900"
                        onClick={() => handleEdit(task._id, task)}
                      >
                        <MdEdit className="w-5 h-5" />
                        <span className="text-xs">Edit</span>
                      </button>
                    ) : !task.members.some(
                        (m) => m.member?._id.toString() === user._id.toString()
                      ) ? (
                      <button
                        className="flex flex-col items-center text-gray-600 hover:text-gray-900"
                        // onClick={() => handleJoinTask(task._id)}
                        onClick={() => {
                          if ( task.status === "completed") {
                            toast.info("Task is completed.",{
                              transition:Slide,
                              autoClose:1000
                            })
                          } else if ( task.status === "not-available") {
                            toast.info("Task is not available.",{
                              transition:Slide,
                              autoClose:1000
                            })
                          } else {
                            handleJoinTask(task._id);
                          }
                        }}
                      
                      >
                        <MdAdd className="w-6 h-6" />
                        <span className="text-xs">Join</span>
                      </button>
                    ) : (
                      <button
                        className="flex flex-col items-center text-gray-600 hover:text-gray-900"
                        // onClick={() => handleLeaveTask(task._id)}
                        onClick={() => {
                          if (task.status === "completed") {
                            toast.info("Task is completed.",{
                              transition:Slide,
                              autoClose:1000
                            })
                          } else if (task.status === "not-available") {
                            toast.info("Task is not-available.",{
                              transition:Slide,
                              autoClose:1000
                            })
                          } else {
                            handleLeaveTask(task._id);
                          }
                        }}
                
                      >
                        <AiOutlineLogout className="w-6 h-6" />
                        <span className="text-xs">Leave</span>
                      </button>
                    )}

                    <button
                      className="flex flex-col items-center text-gray-600 hover:text-gray-900"
                      // onClick={() => showExpand(task._id, task)}
                      onClick={() => {
                        if (task.status === "completed" && user._id !== task.owner._id) {
                          toast.info("Task is completed.",{
                            transition:Slide,
                            autoClose:1000
                          })
                        } else if (task.status === "not-available" && user._id !== task.owner._id) {
                          toast.info("Task is not available.",{
                            transition:Slide,
                            autoClose:1000
                          })
                        } else {
                          showExpand(task._id, task);
                        }
                      }}
              
                    >
                      <FaExpand className="w-5 h-5" />
                      <span className="text-xs">Expand</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center col-span-full text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No tasks available. Please add a task.
                </h3>
                <button
                  onClick={() => navigate("/home/add_task")}
                  className="mt-2 text-gray-500 hover:text-gray-900 flex items-center justify-center"
                >
                  <MdAdd className="mr-1" />
                  Add Task
                </button>
              </div>
            )}
          </div>

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleJoin}
            title="Join Task "
            message="Are you sure you want to join this task?"
          />
          <ConfirmationModal
            isOpen={isLeaveModalOpen}
            onClose={() => setIsLeaveModalOpen(false)}
            onConfirm={handleLeave}
            title="Leave Task Confirmation"
            message="Are you sure you want to Leave this task?"
          />
          <ConfirmationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={() => setditModalOpen(true)}
            title="Edit Task Confirmation"
            message="Are you sure you want to Edit this task?"
          />
          <ConfirmationModal
            isOpen={isRemoveModalOpen}
            onClose={() => setIsRemoveModalOpen(false)}
            onConfirm={handleRemoveMember}
            title="Remove member Confirmation"
            message={
              <span>
                Are you sure you want to remove{" "}
                <strong>{memeberNameToremove}</strong> from this task?
              </span>
            }
          />
          <ExpandModal
            isOpen={isExpandModalOpen}
            onClose={() => setIsExpandModalOpen(false)}
            onDeleteMember={handleRemove}
            task={expandTask}
            memberStatus={enums}
            onLeaveTask={handleLeaveTask}
            onSaveStatusChange={handleSaveStatusChange}
          />
          <EditTaskModal
            isOpen={EditModalOpen}
            onClose={() => setditModalOpen(false)}
            task={editTask}
            handleSubmit={EditTask}
          />
        </div>
        {tasks.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Transition>
    </>
  );
}
