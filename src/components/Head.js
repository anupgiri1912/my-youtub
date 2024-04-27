import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  useEffect(() => {
    // API call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSugsestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // useEffect(() => {
  //   // Check if searchQuery is not null or empty
  //   if (searchQuery) {
  //     // Call the getSearchSuggestion function or make API call here
  //     getSearchSugsestion();
  //     console.log(searchQuery);
  //   } else {
  //     console.log("Search query is null or empty, skipping API call.");
  //   }

  //   // Clean up function
  //   return () => {
  //     console.log("Cleanup function");
  //   };
  // }, [searchQuery]);

  const getSearchSugsestion = async () => {
    console.log("API CALL-", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          onClick={() => toggleMenuHandler()}
          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/hamburger_button_menu_icon_155296.png"
          alt="menu"
        />

        <a href="/" />

        <img
          className="h-8 mx-2"
          src="https://vectorseek.com/wp-content/uploads/2021/01/YouTube-Logo-Vector.png"
          alt="youtube-logo"
        />
      </div>

      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400  rounded-r-full px-5 py-2 bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className=" fixed bg-white py-2 px-5 w-[31rem] shadow-lg rounded-lg">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-200 ">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-logo"
        />
      </div>
    </div>
  );
};

export default Head;
