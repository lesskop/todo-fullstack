import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const titles = [
    "Lorem ipsum dolor sit.",
    "Iure temporibus aspernatur quas!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium cumque consequuntur quisquam aut? Dicta, maiores.",
    "Ipsa, vero totam? Dignissimos, fuga enim ex maiores eius officia laudantium laborum perferendis soluta eaque!",
  ];

  return (
    <div className="w-full px-10 pb-10 max-w-screen-md mx-auto flex flex-col">
      {titles.map((title, index) => (
        <TaskItem key={index} title={title} />
      ))}
    </div>
  );
};

export default TaskList;
