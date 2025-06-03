import React, { useState } from "react";
import download from "../assets/download.png";
import Logo from "../assets/Logoicon.png";
import Home from "../assets/home.png";
import Explore from "../assets/explore.png";
import Create from "../assets/create.png";
import Settings from "../assets/settings.png";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import SettingsModal from "../components/Settings";

function LikedPage() {
  const favImgs = JSON.parse(localStorage.getItem("favImgs")) || [];
  const { darkMode } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className={`p-4 flex relative h-screen w-screen  ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
      }`}
    >
      <nav
        className={`fixed bottom-0 w-full h-20 flex flex-row justify-around border-gray-300 z-20
    lg:flex-col lg:top-0 left-0 lg:w-20 lg:h-full lg:border-r-2
    ${darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"}`}
      >
        <img
          src={Logo}
          alt="Logo"
          className="hidden lg:block p-5 size-20 cursor-pointer"
           onClick={() => window.location.reload()}
        />

        <Link to="/home">
          <img
            src={Home}
            alt="Home"
            className={`p-5 size-20 cursor-pointer  ${
              darkMode ? "invert" : ""
            }`}
          />
        </Link>

        <Link to="/explore">
          <img
            src={Explore}
            alt="Explore"
            className={`p-5 size-20 cursor-pointer  ${
              darkMode ? "invert" : ""
            }`}
          />
        </Link>
        <Link to="/likedimg">
          <img
            src={Create}
            alt="Create"
            className={`p-5 size-20 cursor-pointer  ${
              darkMode ? "invert" : ""
            }`}
          />
        </Link>
        <div className="flex flex-col justify-end">
          <img
            src={Settings}
            alt="Settings"
            className={`p-5 size-20 cursor-pointer  ${
              darkMode ? "invert" : ""
            }`}
            onClick={() => setSettingsOpen(true)}
          />
          <SettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      </nav>
      <div
        className={`absolute lg:left-20 ${
          darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
        }`}
      >
        <h1
          className={`text-2xl font-bold pl-10 mb-4  ${
            darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
          }`}
        >
          Favorite Images{" "}
        </h1>

        {favImgs.length === 0 ? (
          <p className="pl-10 mb-4">No liked images yet.</p>
        ) : (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pl-10 pr-10 ${
              darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
            }`}
          >
            {favImgs.map((img, key) => {
              return <FavImgCard key={key} img={img} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FavImgCard({ img, index }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <img
        key={img.id || index}
        src={img.urls.regular}
        alt={img.alt_description || "Liked Image"}
        className="rounded-2xl group-hover:brightness-80 transition duration-300"
      />

      <a href={img.urls.raw} target="_blank" download={`image-${img.id}.jpg`}>
        <img
          src={download}
          alt="download-icon"
          className="absolute top-3 bg-cyan-50 rounded left-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        />
      </a>
    </div>
  );
}

export default LikedPage;
