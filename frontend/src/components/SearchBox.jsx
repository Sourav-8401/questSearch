import React, { useState } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import MovingSuggestion from "./MovingSuggestion";
import DisplaySearchResult from "./DisplaySearchResult";
import DisplaySuggestion from "./DisplaySuggestion";

function SearchBox() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input.trim().length === 0) {
      setSearchResult([]);
      setSuggestionData([]);
    }
  };

  const handleSuggestionClick = (query) => {
    const processedData = query.slice(3);
    setSearchInput(processedData);
    setSuggestionData([]);
    handleSearch(processedData); 
  };

  const limits = 10;

  const handleSearch = async (input = searchInput) => {
    if (!input.trim()) {
      console.log("Query is empty");
      return;
    }

    try {
      const response = await axios.get(
        `https://quest-search-backend.vercel.app/search/searchtitles?search=${input}&limits=${limits}`
      );
      const responseData = response.data.data;
      setSuggestionData([]);
      setSearchResult(responseData);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };

  const handleSuggestion = async (event) => {
    const query = event.target.value;

    if (!query.trim()) {
      setSuggestionData([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://quest-search-backend.vercel.app/search/suggest?search=${query}`
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        title:
          item.title.length > 80 ? item.title.slice(0, 80) + "..." : item.title,
      }));
      setSuggestionData(processedData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div>
      <div className="overflow-hidden max-h-[70px] flex justify-start gap-2 relative w-[750px] mt-[25px] p-2 rounded-3xl border border-gray-200 bg-background dark:border-gray-800">
        <div>
          <img src="/icon.png" alt="" className="w-12 rounded-lg mt-1.5" />
        </div>
        <form
          action=""
          className="w-full relative flex justify-between items-center py-3 px-1 bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-1000"
        >
          <textarea
            onChange={(e) => {
              handleSuggestion(e);
              handleSearchInput(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
            value={searchInput}
            placeholder="Search..."
            className="w-full text-lg scrollbar-none resize-none z-50 border-none dark:text-white bg-transparent h-full rounded-xl focus:outline-none focus:ring-0 pl-3 pr-20"
          ></textarea>
          <button
            type="button"
            onClick={handleSearch} 
            className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-10 rounded-full flex items-center justify-center"
          >
            <IoIosArrowForward />
          </button>
        </form>
      </div>
      {searchInput.length <= 0 && (
        <MovingSuggestion handleSuggestionClick={handleSuggestionClick} />
      )}
      {searchInput.length > 0 && (
        <DisplaySuggestion suggestionData={suggestionData} />
      )}
      {searchInput.length > 0 && searchResult.length > 0 && (
        <DisplaySearchResult
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      )}
    </div>
  );
}

export default SearchBox;
