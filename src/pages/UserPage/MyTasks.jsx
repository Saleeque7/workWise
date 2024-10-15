import React, { useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { userAxiosInstance } from "../../utils/api/PrivateAxios";
import { deletetaskApi, mytaskApi } from "../../utils/api/api";
import ConfirmationModal from "../../components/ConfirmationModal";
import ExpandModal from "../../components/expandModal";
import { toast , Slide } from "react-toastify";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [isdelete ,setIsdelete] = useState(false)
  const [isExpand ,setIsExpand] = useState(false)
  const [idToDelete ,setIdTodelete] =useState(null)
  const [taskNameToDelete ,setTaskNameTodelete] =useState(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await userAxiosInstance.get(mytaskApi);
        if (res.data && res.data.success) {
          setTasks(res.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async () => {
    try {
      console.log(idToDelete, "inda");
  
      const res = await userAxiosInstance.delete(`${deletetaskApi}`, {
        params: { id: idToDelete },
      });
      if(res.data){
        toast.success('success',{
            transition: Slide,
            autoClose: 1000,
        })

          setTasks(tasks.filter((task) => task._id !== idToDelete));
          setIsdelete(false); 
      }
     
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  const handleDelete = (id,name) =>{
    console.log(id,"id???");
    
    setIsdelete(true)
    setIdTodelete(id)
    setTaskNameTodelete(name)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return " text-green-500";
      case "Medium":
        return " text-yellow-500";
      case "High":
        return " text-red-500";
      default:
        return " text-gray-800";
    }
  };



  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border rounded-md border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Title
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Priority
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Overview
              </th>

              {/* <th className="px-4 py-2 border border-gray-300 text-left">
                Members
              </th> */}
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="bg-tablebg hover:bg-gray-50">
                <td className="px-4 py-2 border  border-gray-300">
                  {task.title}
                </td>
                <td
                  className={` px-4 py-2 border border-gray-300 ${getPriorityColor(
                    task?.priority
                  )}`}
                >
                  {task.priority}
                </td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    task.status === "completed"
                      ? "text-green-600"
                      : task.status === "not-available"
                      ? "text-red-600"
                      : "text-activeColor"
                  }`}
                >
                  {task.status}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {task.overView || "No Overview"}
                </td>
                {/* <td className="px-4 py-2 border border-gray-300">
                  <ul>
                    {task.members.map((member, index) => (
                      <li key={index}>
                        {member.member?.name || "Unknown Member"} -{" "}
                        {member.memberStatus}
                      </li>
                    ))}
                  </ul>
                </td> */}
                <td className="px-4 py-2 border border-gray-300 relative">
                  <div className="relative group inline-block">
                    <button className="flex justify-center items-center p-2 focus:outline-none text-gray-600">
                      <RxDotsHorizontal className="h-6 w-6 text-gray-600" />
                    </button>

                    <div className="absolute right-0 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg z-50">
                      <div
                        className="p-1"
                        onMouseEnter={(e) => e.stopPropagation()}
                      >
                        {/* <button
                          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                      
                            console.log(
                              `Members: ${task.members
                                .map((m) => m.member?.name)
                                .join(", ")}`
                            );
                          }}
                        >
                           Members
                        </button> */}
                        <button
                          className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(task._id,task.title)}
                        >
                          Delete 
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
            isOpen={isdelete}
            onClose={() => setIsdelete(false)}
            onConfirm={deleteTask}
            title="Remove task Confirmation"
            message={
              <span>
                Are you sure you want to delete{" "}
                <strong>{taskNameToDelete}</strong>   task?
              </span>
            }
          />
    
    </div>
  );
}
