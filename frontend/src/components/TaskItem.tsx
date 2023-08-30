import React, { useState, useRef, useEffect } from "react";

import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdDone, MdClose } from "react-icons/md";
import { Task } from "../shared/types";
import { deleteTaskFromDB, updateTaskInDB } from "../shared/apiService";

interface TaskItemProps {
  task: Task;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTaskList }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(task.title);
  const [originalTitle, setOriginalTitle] = useState<string>(task.title);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = async () => {
    await deleteTaskFromDB(task.id);
    setTaskList((prevTaskList) =>
      prevTaskList.filter((item) => item.id !== task.id)
    );
  };

  const handleConfirmEdit = () => {
    if (currentTitle === originalTitle) {
      setEditable(!editable);
      return;
    }

    setOriginalTitle(currentTitle);

    updateTaskInDB(task.id, currentTitle);

    setTaskList((prevTaskList) =>
      prevTaskList.map((item) =>
        item.id === task.id ? { ...item, title: currentTitle } : item
      )
    );

    setEditable(false);
  };

  const handleCancelEdit = () => {
    setCurrentTitle(originalTitle);
    setEditable(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleConfirmEdit();
    } else if (e.key == "Escape") {
      handleCancelEdit();
    }
  };

  useEffect(() => {
    if (editable && editInputRef.current) {
      editInputRef.current.select();
    }
  }, [editable]);

  return (
    <div className="py-3 w-full">
      <div
        className="py-2 px-4 flex gap-4 justify-between  rounded-md shadow-md
      bg-gray-900 dark:bg-gray-700"
      >
        {editable ? (
          <input
            ref={editInputRef}
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-xl text-white w-full outline-none
            bg-gray-900 dark:bg-gray-700 caret-white"
          />
        ) : (
          <p className="text-xl text-white truncate">{currentTitle}</p>
        )}
        <div className="flex gap-1">
          {editable ? (
            <div className="flex gap-1">
              <button
                className="hover:scale-125 transition duration-300"
                onClick={handleConfirmEdit}
              >
                <MdDone color="white" size={24} />
              </button>
              <button
                className="hover:scale-125 transition duration-300"
                onClick={handleCancelEdit}
              >
                <MdClose color="white" size={24} />
              </button>
            </div>
          ) : (
            <button
              className="hover:scale-125 transition duration-300"
              onClick={handleConfirmEdit}
            >
              <MdEdit color="white" size={24} />
            </button>
          )}
          <button
            className="hover:scale-125 transition duration-300"
            onClick={handleDelete}
          >
            <IoMdTrash color="white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
