import { Routes ,Route } from "react-router-dom";
import Task from "./Task";
import Landing from "../../components/Landing";
import Addtask from "../../components/Addtask";
import MyTasks from "./MyTasks";


export default function Dashboard() {
  return (
    <div className="min-h-screen flex-1 bg-customPeach p-6 m-4 rounded-xl">
      <Routes>
        <Route path="/" element={<Landing/>}/>  
        <Route path="/tasks" element={<Task/>}/>
        <Route path="/add_task" element={<Addtask />} />
        <Route path="/my_tasks" element={<MyTasks />} />
      </Routes>
    </div>
  );
}
