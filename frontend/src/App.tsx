import { useEffect, useState } from "react";

import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

import { Task } from "./shared/types";
import { fetchTaskListFromDB } from "./shared/apiService";

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTaskListFromDB();
      setTaskList(data);
    };

    fetchData();
  }, []);

  return (
    <div className="app dark:bg-gray-900">
      <Header />
      <AddTask
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        setTaskList={setTaskList}
      />
      <TaskList taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
};

export default App;
