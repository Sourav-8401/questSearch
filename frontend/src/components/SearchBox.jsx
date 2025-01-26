import React, { useState } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

// Import custom components
import MovingSuggestion from "./MovingSuggestion";
import DisplaySearchResult from "./DisplaySearchResult";
import DisplaySuggestion from "./DisplaySuggestion";

function SearchBox() {
  const [searchInput, setSearchInput] = useState(""); // Current search input value
  const [suggestionData, setSuggestionData] = useState([]); // Suggestions based on input
  const [searchResult, setSearchResult] = useState([]); // Search results from API
  let [loading, setLoading] = useState(false);
  // Handle changes in the search input field
  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    // Clear results and suggestions if input is empty
    if (input.trim().length === 0) {
      setSearchResult([]);
      setSuggestionData([]);
    }
  };

  // Handle user clicking on a Moving suggestion
  const handleMovingSuggestionClick = (query) => {
    // Process the query (e.g., remove the first 3 characters if necessary)
    const processedData = query.slice(3);
    setSearchInput(processedData);
    setSuggestionData([]);
    handleSearch(processedData);
  };

  const handleTypingSuggestionClick = (query) => {
    setSearchInput(query.slice(0, 60) + "...");
    setSuggestionData([]);
    handleSearch(query);
  };
  const limits = 10; // Limit the number of search results

  // Handle search action and fetch search results from the backend API
  const handleSearch = async (input = searchInput) => {
    if (!input.trim()) {
      console.log("Query is empty");
      return;
    }
    try {
      // Make a GET request to the search API with the input and limits
      setLoading(true);
      const response = await axios.get(
        `https://quest-search-backend.vercel.app/search/searchtitles?search=${input}&limits=${limits}`
      );
      const responseData = response.data.data;
      setLoading(false);
      setSuggestionData([]);
      setSearchResult(responseData);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };

  // Handle fetching suggestions as the user types
  const handleSuggestion = async (event) => {
    const query = event.target.value;
    if (!query.trim()) {
      setSuggestionData([]);
      return;
    }
    try {
      // Make a GET request to fetch suggestions based on the current query
      const response = await axios.get(
        `https://quest-search-backend.vercel.app/search/suggest?search=${query}`
      );
      // Process suggestion data (e.g., limit title length to 80 characters)
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
      {/* Search box container */}
      <div className="overflow-hidden max-h-[70px] flex justify-start gap-2 relative w-[750px] mt-[25px] p-2 rounded-3xl border border-gray-200 bg-background dark:border-gray-800">
        {/* Icon next to the search input */}
        <div>
          <img src="/icon.png" alt="" className="w-12 rounded-lg mt-1.5" />
        </div>
        {/* Search form */}
        <form
          action=""
          className="w-full relative flex justify-between items-center py-3 px-1 bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        >
          {/* Textarea for search input */}
          <textarea
            onChange={(e) => {
              handleSuggestion(e);
              handleSearchInput(e);
            }}
            onKeyDown={(e) => {
              // Trigger search on Enter key without Shift
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }else if(e.key === "Backspace"){
                setSearchResult([]);
              }
            }}
            value={searchInput}
            placeholder="Search..."
            className="w-full text-lg scrollbar-none resize-none z-50 border-none dark:text-white bg-transparent h-full rounded-xl focus:outline-none focus:ring-0 pl-3 pr-20"
          ></textarea>
          {/* Search button */}
          <button
            type="button"
            onClick={()=>{handleSearch(searchInput)}}
            className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-10 rounded-full flex items-center justify-center"
          >
            <IoIosArrowForward />
          </button>
        </form>
      </div>

      {/* Display moving suggestions when search input is empty */}
      {searchInput.length <= 0 && (
        <MovingSuggestion
          handleMovingSuggestionClick={handleMovingSuggestionClick}
        />
      )}

      {/* Display suggestions when there is input */}
      {searchInput.length > 0 && (
        <DisplaySuggestion
          suggestionData={suggestionData}
          handleTypingSuggestionClick={handleTypingSuggestionClick}
        />
      )}
 {loading &&  <div className="sweet-loading  mt-20">
        <ClipLoader
          loading={loading}
          color={"gray"}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>}
      {/* Display search results if there are any */}
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
