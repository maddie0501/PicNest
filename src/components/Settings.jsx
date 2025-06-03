import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

function Settings({ isOpen, onClose }) {
  const { darkMode, toggleTheme } = useTheme();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute bottom-20 left-24 z-[999]  bg-white text-black  p-6 rounded-xl shadow-xl w-96">
        <button className="pr-4 cursor-pointer p-3  hover:bg-gray-100 w-full rounded-xl text-start">
          Settings
        </button>

        <button
          className="pr-4 cursor-pointer p-3 hover:bg-gray-100  w-full rounded-xl text-start"
          onClick={toggleTheme}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button className="pr-4 cursor-pointer p-3  hover:bg-gray-100 w-full rounded-xl text-start">
          <Link to="/" href="/">
            Log Out
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Settings;
