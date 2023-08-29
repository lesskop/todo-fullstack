import { useRef } from "react";

import { Task } from "../shared/types";
import { randomPlaceholderTask } from "../shared/exampleTasks";
import { addTaskToDB } from "../shared/apiService";

interface AddTaskProps {
  currentTitle: string;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTask: React.FC<AddTaskProps> = ({
  currentTitle,
  setCurrentTitle,
  setTaskList,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTask = async () => {
    if (currentTitle.trim() === "") {
      return;
    }

    const addedTask = await addTaskToDB(currentTitle);
    setTaskList((prevTaskList) => [...prevTaskList, addedTask]);
    setCurrentTitle("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleAddTask();
    }
  } 

  return (
    <div className="w-full max-w-screen-md px-10 pt-10 pb-4 mx-auto text-center">
      <h2 className="text-2xl font-bold pb-5 dark:text-white">Add New Task!</h2>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          ref={inputRef}
          placeholder={randomPlaceholderTask}
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="p-2 outline-none border-gray-900 border-2 rounded-md 
          w-full font-semibold text-lg shadow-md"
          autoFocus
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAddTask}
          className="py-2 px-4 font-bold text-lg rounded-md whitespace-nowrap
        bg-gray-900 dark:bg-gray-700 text-white shadow-md
        hover:bg-gray-700 dark:hover:bg-gray-500"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
