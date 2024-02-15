import React, { useState, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftHome = () => {
  const [theme, setTheme] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const currTheme = localStorage.theme;

  useEffect(() => {
    if (currTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currTheme]);

  const setThemeInStorage = (theme) => {
    localStorage.setItem("theme", theme);
  };

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setThemeInStorage(theme === "dark" ? "light" : "dark");
  };

  // const currTheme = JSON.stringify(localStorage.getItem("theme"));
  // console.log(currTheme);
  // console.log(currTheme === "dark");

  return (
    <div className="flex-1 border-r-2 border-gray-500 min-h-screen dark:bg-[#123456] dark:text-white bg-[#e4e4e5]">
      <div className="flex flex-col gap-10 p-5 sticky top-0">
        {/* Top logo section  */}
        <Link to="/">
          <div className="flex gap-5 items-center justify-center">
            <TwitterIcon fontSize="large" className="text-blue-600" />
            <h1 className="font-bold text-2xl">Twitter</h1>
          </div>
        </Link>

        {/* main area  */}
        <div className="flex flex-col gap-6 items-start mx-auto">
          <Link to="/">
            <div className="flex gap-5 items-center">
              <HomeIcon />
              <h5 className="font-semibold text-xl">Home</h5>
            </div>
          </Link>

          <Link to="/explore">
            <div className="flex gap-5 items-center">
              <TagIcon />
              <h5 className="font-semibold text-xl">Explore</h5>
            </div>
          </Link>

          <div className="flex gap-5 items-center">
            <NotificationsIcon />
            <h5 className="font-semibold text-xl">Notifications</h5>
          </div>

          <div className="flex gap-5 items-center">
            <BookmarkIcon />
            <h5 className="font-semibold text-xl">Bookmarks</h5>
          </div>

          <div
            className="flex gap-5 items-center cursor-pointer"
            onClick={handleThemeChange}
          >
            {currTheme === "dark" ? <DarkModeIcon /> : <WbSunnyIcon />}
            <h5 className="font-semibold text-xl">
              {currTheme === "dark" ? "Dark" : "Light"} Mode
            </h5>
          </div>

          <Link to="/profile">
            <div className="flex gap-5 items-center">
              <PersonIcon />
              <h5 className="font-semibold text-xl">Profile</h5>
            </div>
          </Link>

          <div className="flex gap-5 items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-2 rounded-full text-lg font-semibold">
              TWEET
            </button>
          </div>
        </div>

        {/* logout area  */}
        <div className="flex gap-5 items-center mx-auto">
          <div className="flex gap-2 items-center">
            <div className="border-2 border-black dark:border-white rounded-full w-11 h-11">
              <img
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-0">
              <span className="text-sm">{currentUser?.username}</span>
              <span className="text-sm">{currentUser?.handle}</span>
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <MoreVertIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
