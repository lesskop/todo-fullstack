const exampleTasks: Array<string> = [
  "Buy groceries",
  "Walk the dog",
  "Write a blog post",
  "Go to the gym",
  "Run 2 kilometers",
  "Walk in the park",
  "Learn React",
  "Cook dinner",
];

const AddTask: React.FC = () => {
  const randomIndex: number = Math.floor(Math.random() * exampleTasks.length);
  const randomPlaceholderTask: string = exampleTasks[randomIndex];

  return (
    <div className="w-full max-w-screen-md px-10 pt-10 pb-4 mx-auto text-center">
      <h2 className="text-2xl font-bold pb-5 dark:text-white">Add New Task!</h2>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder={randomPlaceholderTask}
          className="p-2 outline-none border-gray-900 border-2 rounded-md 
          w-full font-semibold text-lg shadow-md"
        />
        <button
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
