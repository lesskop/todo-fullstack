import React, { useState, useRef, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdDone, MdClose } from "react-icons/md";

interface TaskItemProps {
  title: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [originalTitle, setOriginalTitle] = useState<string>(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConfirmEdit = () => {
    setOriginalTitle(currentTitle);
    setEditable(!editable);
  };

  const handleCancelEdit = () => {
    setCurrentTitle(originalTitle);
    setEditable(false);
  };

  useEffect(() => {
    if (editable && inputRef.current) {
      inputRef.current.select();
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
            ref={inputRef}
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
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
          <button className="hover:scale-125 transition duration-300">
            <IoMdTrash color="white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
