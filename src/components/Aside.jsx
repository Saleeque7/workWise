import React, { useState, useEffect } from "react";
import { FiHome, FiCheckCircle } from "react-icons/fi";
import { MdAssignment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const [activeTask, setActiveTask] = useState(""); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!activeTask) {
      setActiveTask("dashboard");
      navigate("/home");
    }
  }, [activeTask, navigate]);

  const handleNavigation = (task, route) => {
    setActiveTask(task);
    navigate(route); 
  };

  return (
    <aside className={`bg-customGray rounded-lg m-4 mr-0 text-white w-14 transition-all duration-300 md:w-64`}>
      <div className="flex flex-col items-center md:items-start p-4">
        <ul className="space-y-6 pt-8">
          <li
            className={`flex items-center ${activeTask === "dashboard" ? "text-customPeach font-bold" : ""}`}
            onClick={() => handleNavigation("dashboard", "/home")}
          >
            <FiHome className="mr-2" />
            <span className="hidden md:inline">Dashboard</span>
          </li>
          <li
            className={`flex items-center ${activeTask === "tasks" ? "text-customYellow font-bold" : ""}`}
            onClick={() => handleNavigation("tasks", "/home/tasks")}
          >
            <FiCheckCircle className="mr-2" />
            <span className="hidden md:inline">Tasks</span>
          </li>
          <li
            className={`flex items-center ${activeTask === "my_task" ? "text-customYellow font-bold" : ""}`}
            onClick={() => handleNavigation("my_task", "/home/my_tasks")}
          >
            <MdAssignment className="mr-2" />
            <span className="hidden md:inline">My tasks</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
