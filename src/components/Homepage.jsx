import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/Logoicon.png";
import Home from "../assets/home.png";
import Explore from "../assets/explore.png";
import Create from "../assets/create.png";
import Updates from "../assets/updates.png";
import Messages from "../assets/messages.png";
import Settings from "../assets/settings.png";
import Search from "../assets/search.png";

function HomePage() {
  const [image, setImage] = useState([]);
  const [search, setsearch] = useState("");
  const [debounceTimeout, setdebounceTimeout] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchimages = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?per_page=30&client_id=parkNpXZ3OnuLc58CvribWfim0fjw0Omb9on2Irhhi0`
        );
        console.log(res);
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
    <div className="flex h-screen">
      <nav className="flex flex-col justify-start box-border size-20 border-r-2 border-gray-300 h-screen  ">
        <img src={Logo} alt="Logo" className="p-5 size-20 cursor-pointer" />
       
        <img src={Home} alt="Home" className="p-5 size-20 cursor-pointer" />
      
        <img
          src={Explore}
          alt="Explore"
          className="p-5 size-20 cursor-pointer"
        />
        <img src={Create} alt="Create" className="p-5 size-20 cursor-pointer" />
        <img
          src={Updates}
          alt="Updates"
          className="p-5 size-20 cursor-pointer"
        />
        <img
          src={Messages}
          alt="Messages"
          className="p-5 size-20 cursor-pointer"
        />
        <div className="flex flex-col justify-end">
          <img
            src={Settings}
            alt="Settings"
            className="p-5 size-20 cursor-pointer"
          />
        </div>
      </nav>
      {/*search bar */}
      <div className="flex-1 p-6 flex-row">
        <form action="">
          <div className="relative">
            <img
              src={Search}
              alt="search icon"
              className="absolute left-3 top-3 "
            />
            <input
              type="text"
              name="name"
              placeholder="Search"
              className="bg-gray-100  w-full p-3 pl-10 rounded-xl"
              value={search}
              onChange={(e) => debounceSearch(e, debounceTimeout)}
            />
          </div>
        </form>

        <div className="columns-2 md:columns-4 lg:columns-6 gap-4 pt-3">
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
  );
}

function ImageCard({ photo }) {
  return (
    <div className="p-2">
      <img
        src={photo.urls.regular}
        alt={photo.alt_description}
        className="rounded-2xl"
      />
    </div>
  );
}

export default HomePage;
