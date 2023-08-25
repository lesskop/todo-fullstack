import AddTask from "./components/AddTask";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="app dark:bg-gray-900">
      <Header />
      <AddTask />
    </div>
  );
};

export default App;
