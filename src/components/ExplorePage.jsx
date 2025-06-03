import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Logo from "../assets/Logoicon.png";
import Home from "../assets/home.png";
import Explore from "../assets/explore.png";
import Create from "../assets/create.png";
import Settings from "../assets/settings.png";
import Search from "../assets/search.png";
import { Link } from "react-router-dom";
import like from "../assets/heart.png";
import SettingsModal from "../components/Settings";
import { useTheme } from './ThemeContext';

function ExplorePage() {
  const [explore, setExplore] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [search, setsearch] = useState("");
  const [debounceTimeout, setdebounceTimeout] = useState(null);
  const [loading, setloading] = useState(true);
  const [filterimages, setFilterImages] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { darkMode } = useTheme();

  const debounceSearch = (event, debounceTimeout) => {
    const val = event.target.value;
    setsearch(val);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const Timeout = setTimeout(async () => {}, 500);

    setdebounceTimeout(Timeout);
  };


  useEffect(() => {
    const fetchimages = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?per_page=30&client_id=parkNpXZ3OnuLc58CvribWfim0fjw0Omb9on2Irhhi0`
        );
        //console.log(res);
        setExplore(res.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    };
    fetchimages();
  }, []);

  const getRandomExploreCards = useMemo(() => {
    if (!Array.isArray(explore) || !explore.length) return [];

    const keywordMap = new Map();

    explore.forEach((img) => {
      const desc = img.alt_description || "";
      const keyword = desc.split(" ").find((word) => word.length > 3);

      if (keyword && !keywordMap.has(keyword.toLowerCase())) {
        keywordMap.set(keyword.toLowerCase(), { ...img, keyword });
      }
    });

    const uniqueGenre = Array.from(keywordMap.values());
    return uniqueGenre.sort(() => 0.5 - Math.random()).slice(0, 7);
  }, [explore]);

  const handleGenreClick = useCallback(
    (description) => {
      setSelectedGenre(description);

      const keywords = description
        ?.toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3);

      const matches = explore.filter((img) => {
        const imgDesc = img.alt_description?.toLowerCase() || "";
        return keywords.some((word) => imgDesc.includes(word));
      });

      setFilterImages(matches);
    },
    [explore]
  );

  const handleAddFav = (photo) => {
    const existingFav = JSON.parse(localStorage.getItem("favImgs")) || [];

    const alreadyExists = existingFav.some((favImg) => favImg.id === photo.id);
    if (alreadyExists) return;

    const cleanedPhoto = {
      id: photo.id,
      urls: photo.urls,
      alt_description: photo.alt_description,
    };

    const updatedFavs = [...existingFav, cleanedPhoto];
    localStorage.setItem("favImgs", JSON.stringify(updatedFavs));
  };

  const todayDate =
    new Date().toLocaleDateString("en-US", {
    
      year: "numeric",
      month: "long",
      day: "numeric",

    });


  return (
    <div className="flex">
      <nav
      className={`fixed bottom-0 w-full h-20 flex flex-row justify-around border-gray-300 z-20
    lg:flex-col lg:top-0 left-0 lg:w-20 lg:h-full lg:border-r-2
    ${darkMode ? 'bg-neutral-700 text-white' : 'bg-white text-black'}`}
      >
        <img
          src={Logo}
          alt="Logo"
          className="hidden lg:block p-5 size-20 cursor-pointer"
          onClick={() => window.location.reload()}
        />

        <Link to="/home">
          <img src={Home} alt="Home" className={`p-5 size-20 cursor-pointer  ${darkMode ? 'invert': ''}`} />
        </Link>

        <Link to="/explore">
          <img
            src={Explore}
            alt="Explore"
            className={`p-5 size-20 cursor-pointer  ${darkMode ? 'invert': ''}`}
          />
        </Link>

        <Link to="/likedimg">
          <img
            src={Create}
            alt="Create"
            className={`p-5 size-20 cursor-pointer  ${darkMode ? 'invert': ''}`}
          />
        </Link>
        <div className="flex flex-col justify-end">
          <img
            src={Settings}
            alt="Settings"
            className={`p-5 size-20 cursor-pointer  ${darkMode ? 'invert': ''}`}
             onClick={() => setSettingsOpen(true)}
          />
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
      </nav>

      <div className={`h-full w-full ${darkMode ? 'bg-neutral-700 text-white' : 'bg-white text-black'}`}>
        <div className={`fixed top-0 left-0 lg:pl-24 w-full  z-10  px-6 pt-4 pb-2 ${darkMode ? 'bg-neutral-700 text-white' : 'bg-white text-black'}`}>
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
              className={`text-black w-full p-3 pl-10 rounded-xl ${darkMode ? "bg-neutral-800 text-white" : "bg-gray-100 text-black"}`}
              value={search}
              onChange={(e) => debounceSearch(e, debounceTimeout)}
            />
          </form>
        </div>

        <div className={`pt-20 w-full pb-20 lg:ml-24 ${darkMode ? 'bg-neutral-700 text-white' : 'bg-white text-black'}`}>
         
          <div className="flex flex-col justify-center text-center">
            <h6 className="text-xl font-bold  mb-1">{loading} {todayDate}</h6>
          <h2 className="text-4xl font-bold mb-4">Stay Inspired</h2>
          </div>

          {!selectedGenre ? (
            <div className=" grid grid-cols-4 gap-4 mb-6 pb-10">
              <div className="col-start-2 col-span-2">
                <div className="grid grid-cols-2 gap-4 ">
                  {getRandomExploreCards.map((img) => (
                    <div
                      key={img.id}
                      className="cursor-pointer border rounded overflow-hidden group"
                      onClick={() => handleGenreClick(img.keyword)}
                    >
                      <img
                        src={img.urls.regular}
                        alt={img.alt_description}
                        className="w-full h-40 object-cover group-hover:brightness-80 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filterimages.map((img) => (
                <div key={img.id} className="p-2">
                  <div className="relative rounded-2xl overflow-hidden group shadow hover:shadow-lg transition">
                    <img
                      src={img.urls.regular}
                      alt={img.alt_description}
                      className="w-full h-40 object-cover group-hover:brightness-80 transition duration-300"
                    />
                    <img
                      src={like}
                      alt="heart-icon"
                      className="absolute top-2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => handleAddFav(img)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
