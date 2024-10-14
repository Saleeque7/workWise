import { SiCreatereactapp } from "react-icons/si";
import { CgSandClock } from "react-icons/cg";
import { GiProgression, GiCheckMark } from "react-icons/gi";

export default function Cards({ onGoingTasks, createdTasks, progressingTasks, completedTasks }) {
  return (
    <>
      <div className="bg-card1 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <SiCreatereactapp className="text-white h-5 w-5" />
          <h3 className="text-lg font-semibold text-white">Created Tasks</h3>
        </div>
        <p className="text-3xl font-bold text-white">{createdTasks || 0}</p>
      </div>

      <div className="bg-card2 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <CgSandClock className="text-white h-6 w-6" />
          <h3 className="text-lg font-semibold text-white">Ongoing Tasks</h3>
        </div>
        <p className="text-3xl font-bold text-white">{onGoingTasks || 0}</p>
      </div>

      <div className="bg-card3 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <GiProgression className="text-white h-6 w-6" />
          <h3 className="text-lg font-semibold text-white">
            In-Progress Tasks
          </h3>
        </div>
        <p className="text-3xl font-bold text-white">{progressingTasks || 0}</p>{" "}
      </div>

      <div className="bg-card4 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <GiCheckMark className="text-white h-6 w-6" />
          <h3 className="text-lg font-semibold text-white">Completed Tasks</h3>
        </div>
        <p className="text-3xl font-bold text-white">{completedTasks || 0}</p>{" "}
      </div>
    </>
  );
}
