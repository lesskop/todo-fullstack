import { useEffect, useState } from "react";

import { MdOutlineTaskAlt, MdDarkMode, MdSunny } from "react-icons/md";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className="sticky top-0 w-full h-20 px-10 
      flex items-center justify-end
      bg-gray-900 dark:bg-gray-700 text-white shadow-md"
    >
      <div className="flex mx-auto items-center gap-4">
        <MdOutlineTaskAlt size={28} />
        <h1 className="text-3xl font-bold dark:text-white ">Todo</h1>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="hover:scale-125 transition duration-300"
      >
        {darkMode ? (
          <MdSunny size={28} color="white" />
        ) : (
          <MdDarkMode size={28} />
        )}
      </button>
    </header>
  );
};

export default Header;
