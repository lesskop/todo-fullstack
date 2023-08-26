import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="app dark:bg-gray-900">
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
