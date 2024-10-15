import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import Tasks from "../../components/Tasks";
import Completed from "../../components/Completed";
import Progress from "../../components/Progress";


export default function Task() {
  const [activeTab, setActiveTab] = useState("ALL TASKS");

  return (
    <>
      <div className="w-full max-w-full min-h-screen p-5">
        <div className="relative">
          <ul
            className="flex flex-wrap p-1 list-none rounded-xl bg-taskBar justify-around md:justify-between"
            role="list"
          >
            <li className="flex-auto text-center sm:flex-none md:w-1/4 relative">
              <button
                className={`relative flex items-center justify-center w-full px-2 py-2 sm:px-4 sm:py-3 mb-2 sm:mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                  activeTab === "ALL TASKS"
                    ? "bg-taskBg text-taskText"
                    : "bg-inherit text-white"
                }`}
                onClick={() => setActiveTab("ALL TASKS")}
                role="tab"
                aria-selected={activeTab === "ALL TASKS"}
                aria-controls="ALL TASKS"
              >
                <FaTasks className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline-block text-xs sm:text-sm">
                  ALL TASKS
                </span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 mb-1 w-max bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity hover:opacity-100">
                  All Tasks
                </span>
              </button>
            </li>

            <li className="flex-auto text-center sm:flex-none md:w-1/4 relative">
              <button
                className={`relative flex items-center justify-center w-full px-2 py-2 sm:px-4 sm:py-3 mb-2 sm:mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                  activeTab === "IN-PROGRESS"
                    ? "bg-taskBg text-taskText"
                    : "bg-inherit text-white"
                }`}
                onClick={() => setActiveTab("IN-PROGRESS")}
                role="tab"
                aria-selected={activeTab === "IN-PROGRESS"}
                aria-controls="IN-PROGRESS"
              >
                <GiProgression className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline-block text-xs sm:text-sm">
                  IN-PROGRESS
                </span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 mb-1 w-max bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity hover:opacity-100">
                  In Progress
                </span>
              </button>
            </li>

            <li className="flex-auto text-center sm:flex-none md:w-1/4 relative">
              <button
                className={`relative flex items-center justify-center w-full px-2 py-2 sm:px-4 sm:py-3 mb-2 sm:mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                  activeTab === "COMPLETED"
                    ? "bg-taskBg text-taskText"
                    : "bg-inherit text-white"
                }`}
                onClick={() => setActiveTab("COMPLETED")}
                role="tab"
                aria-selected={activeTab === "COMPLETED"}
                aria-controls="COMPLETED"
              >
                <MdCheckCircle className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline-block text-xs sm:text-sm">
                  COMPLETED
                </span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 mb-1 w-max bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity hover:opacity-100">
                  Completed
                </span>
              </button>
            </li>
          </ul>
        </div>
        {activeTab === "ALL TASKS" && (
          <div className="p-5">
            <div
              className={activeTab === "ALL TASKS" ? "block" : "hidden"}
              id="ALL TASKS"
              role="tabpanel"
            >
              <Tasks />
            </div>
          </div>
        )}

        {activeTab === "IN-PROGRESS" && (
          <div className="p-5">
            <div
              className={activeTab === "IN-PROGRESS" ? "block" : "hidden"}
              id="IN-PROGRESS"
              role="tabpanel"
            >
              <Progress />
            </div>
          </div>
        )}

        {activeTab === "COMPLETED" && (
          <div className="p-5">
            <div
              className={activeTab === "COMPLETED" ? "block" : "hidden"}
              id="COMPLETED"
              role="tabpanel"
            >
              <Completed />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
