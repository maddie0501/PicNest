import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/Logoicon.png";
import Home from "../assets/home.png";
import Explore from "../assets/explore.png";
import Create from "../assets/create.png";
import Settings from "../assets/settings.png";
import Search from "../assets/search.png";
import like from "../assets/heart.png";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import SettingsModal from "../components/Settings";

function HomePage() {
  const [image, setImage] = useState([]);
  const [search, setsearch] = useState("");
  const [debounceTimeout, setdebounceTimeout] = useState(null);
  const [loading, setloading] = useState(true);
  const { darkMode } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchimages = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?per_page=30&client_id=parkNpXZ3OnuLc58CvribWfim0fjw0Omb9on2Irhhi0`
        );
        // console.log(res);
        setImage(res.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    };
    fetchimages();
  }, []);

  useEffect(() => {
    const fetchcategory = async () => {
      if (search) {
        try {
          const res = await axios.get(
            `https://api.unsplash.com/search/photos?per_page=30&query=${search}&client_id=parkNpXZ3OnuLc58CvribWfim0fjw0Omb9on2Irhhi0`
          );
          // console.log("imgs", res);
          setImage(res.data.results);
          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setloading(false);
        }
      }
    };
    fetchcategory();
  }, [search]);

  const debounceSearch = (event, debounceTimeout) => {
    const val = event.target.value;
    setsearch(val);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const Timeout = setTimeout(async () => {}, 500);

    setdebounceTimeout(Timeout);
  };

  const filterimages = search
    ? image.filter(
        ({ alt_description }) =>
          alt_description &&
          alt_description.toLowerCase().includes(search.toLowerCase())
      )
    : image;

  return (
    <div className="flex">
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
            className={`p-5 size-20 cursor-pointer ${darkMode ? "invert" : ""}`}
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
      {/*search bar */}
      <div
        className={`p-6 ${
          darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`fixed top-0 left-0 lg:pl-24 w-full z-10 px-6 pt-4 pb-2 
    ${darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"}`}
        >
          <form className="relative">
            <img
              src={Search}
              alt="search icon"
              className="absolute left-3 top-3"
            />
            <input
              type="text"
              name="name"
              placeholder="Search"
              className={`  text-black w-full p-3 pl-10 rounded-xl ${
                darkMode
                  ? "bg-neutral-800 text-white"
                  : "bg-gray-100 text-black"
              }`}
              value={search}
              onChange={(e) => debounceSearch(e, debounceTimeout)}
            />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto pt-14">
          <div
            className={`columns-1 sm:columns-2 lg:columns-4 xl:columns-6 gap-4 lg:pl-20   ${
              darkMode ? "bg-neutral-700 text-white" : "bg-white text-black"
            }`}
          >
            {loading ? (
              <h4>Loading images...</h4>
            ) : (
              filterimages.map((photo) => (
                <ImageCard key={photo.id} photo={photo} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageCard({ photo }) {
  const handleAddFav = () => {
    const existingFav = JSON.parse(localStorage.getItem("favImgs")) || [];

    const presentFav = existingFav.some((favImg) => favImg.id === photo.id);

    if (presentFav) return;

    const updateFavs = [...existingFav, photo];

    localStorage.setItem("favImgs", JSON.stringify(updateFavs));
  };

  return (
    <div className="p-2">
      <div className="relative rounded-2xl overflow-hidden group">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          className="w-full h-full object-cover group-hover:brightness-80 transition duration-300"
        />
        <img
          src={like}
          alt="heart-icon"
          className="absolute top-2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={handleAddFav}
        />
      </div>
    </div>
  );
}

export default HomePage;
