import { Transition } from "./Transition";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import { dashboardApi } from "../utils/api/api";
import { userAxiosInstance } from "../utils/api/PrivateAxios";
import PieChart from "./PieChart";
import BarChart from "./BarDiagram";

export default function Landing() {
  const [onGoingTasks, setOngoingTasks] = useState(0);
  const [createdTasks, setcreatedTasks] = useState(0);
  const [progressingTasks, setProgressigTasks] = useState(0);
  const [completedTasks, setCompletedtasks] = useState(0);
  const [pieData, setPieData] = useState({ labels: [], counts: [] });
  const [barData, setBarData] = useState({ labels: [], counts: [] }); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxiosInstance.get(dashboardApi);
        if (response.data && response.data.success) {
          setOngoingTasks(response.data.onGoing);
          setcreatedTasks(response.data.createdTasks);

          const rawPieData = Array.isArray(response.data.piedata) ? response.data.piedata : [];
          const completedCount = rawPieData.find(item => item._id === "completed")?.count || 0;
          const inProgressCount = rawPieData.find(item => item._id === "in progress")?.count || 0;
          const todoCount = rawPieData.find(item => item._id === "To-do")?.count || 0;

          setProgressigTasks(inProgressCount);
          setCompletedtasks(completedCount);

          setPieData({
            labels: ["To-do", "In progress", "Completed"],
            counts: [todoCount, inProgressCount, completedCount]
          });

          setBarData({
            labels: ["Ongoing", "Created", "Progressing", "Completed"],
            counts: [onGoingTasks, createdTasks, progressingTasks, completedTasks]
          });
        }
      } catch (error) {
        console.error(error, "error in fetching data");
      }
    };
    fetchData();
  }, [onGoingTasks, createdTasks, progressingTasks, completedTasks]); 

  return (
    <div className="w-full max-w-full min-h-screen p-5">
      <Transition>
        <div className="min-h-[90vh] px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-dashh1">Overview</h1>
            <p className="text-dashh1">
              Have a bird's eye view of all your projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <Cards
              onGoingTasks={onGoingTasks}
              createdTasks={createdTasks}
              progressingTasks={progressingTasks}
              completedTasks={completedTasks}
            />
          </div>

          <div className="flex flex-col md:flex-row my-8 p-5 bg-gray-100 shadow-md">
            <div className="flex-1" style={{ marginRight: '20px' }}>
              <PieChart labels={pieData.labels} data={pieData.counts} />
            </div>
            <div className="flex-1">
              <BarChart labels={barData.labels} data={barData.counts} />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
