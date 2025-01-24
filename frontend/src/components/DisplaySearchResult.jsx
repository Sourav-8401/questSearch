import axios from "axios";
import React, { useEffect, useState } from "react";

function DisplaySearchResult({ searchResult,  }) {
  const [toShowData, setToShowData] = useState([]);
  const filters = [
    "ANAGRAM",
    "MCQ",
    "READ_ALONG",
    "CONTENT_ONLY",
    "CONVERSATION",
  ];
  useEffect(()=>{
    setToShowData(searchResult);
  },[searchResult])
  const handleFilter = (ind) => {
    const toMatch = filters[ind];
    const filteredData = searchResult.filter((item) => item.type === toMatch);
    setToShowData(filteredData);
    console.log(ind);
  };

  return (
    <div className="space-y-4 mt-14">
      <div className="gap-3 sticky top-[-1px] py-8 bg-white w-full h-full m-0 dark:bg-[#101010] flex items-center ">
        Filters:
        {filters.map((item, idx) => (
          <button
            key={idx} 
            onClick={() => handleFilter(idx)} 
            className="border w-fit cursor-pointer hover:bg-gray-200 border-zinc-700 px-2 py-1 rounded-3xl text-xs dark:hover:bg-zinc-600"
          >
            {item}
          </button>
        ))}
      </div>
      {toShowData.length == 0 ?<h2>No data</h2> : toShowData.map((data, index) => (
        <div
          key={index}
          className="border  flex flex-col text-left  border-zinc-700 p-4 max-w-[750px] rounded-lg"
        >
          <div className="flex justify-between">
            <h2 className="font-bold  text-lg">{data.title}</h2>
            <p className="bg-green-500 text-black py-1 px-3 h-fit rounded-lg text-xs font-semibold">
              {data.type === "ANAGRAM"
                ? "ANAGRAM " + data.anagramType
                : data.type}
            </p>
          </div>

          {data.type === "ANAGRAM" && data.blocks && (
            <div>
              <div className="mt-4 flex flex-wrap gap-4">
                {data.blocks.map((block, idx) => (
                  <p
                    key={idx}
                    className="text-sm  bg-orange-400 w-fit py-3 px-5 rounded-lg"
                  >
                    {block.text}
                  </p>
                ))}
              </div>
            </div>
          )}

          {data.type === "MCQ" && data.options && (
            <div className="mt-4 ">
              {data.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex border w- py-1 px-2 my-2 rounded-lg border-zinc-700  items-center"
                >
                  <label className="">{option.text}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplaySearchResult;
