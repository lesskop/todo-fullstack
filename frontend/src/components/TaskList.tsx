import TaskItem from "./TaskItem";

import { Task } from "../shared/types";

interface TaskListProps {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ taskList, setTaskList }) => {
  return (
    <div className="w-full px-10 pb-10 max-w-screen-md mx-auto flex flex-col">
      {taskList.map((task: Task) => (
        <TaskItem key={task.id} task={task} setTaskList={setTaskList} />
      ))}
    </div>
  );
};

export default TaskList;
