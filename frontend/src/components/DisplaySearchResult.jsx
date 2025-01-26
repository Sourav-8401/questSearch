import React, { useEffect, useState } from "react";

function DisplaySearchResult({ searchResult }) {
  const [toShowData, setToShowData] = useState([]);
  const [currentSelectedFilter, setCurrentSelectedFilter] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Question-specific answers state

  const filters = [
    "ANAGRAM",
    "MCQ",
    "READ_ALONG",
    "CONTENT_ONLY",
    "CONVERSATION",
    "RESET",
  ];

  useEffect(() => {
    console.log(searchResult)
    setToShowData(searchResult);
  }, [searchResult]);

  const handleFilter = (ind) => {
    const toMatch = filters[ind];
    if (toMatch === "RESET") {
      setToShowData(searchResult);
    } else {
      const filteredData = searchResult.filter((item) => item.type === toMatch);
      setToShowData(filteredData);
    }
    setCurrentSelectedFilter(ind);
  };

  const handleOptionClick = (questionId, optionIdx, isCorrect) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedIdx: optionIdx,
        isCorrect,
      },
    }));
  };

  return (
    <div className="space-y-4 ">
      <div className="gap-3 sticky top-[-1px] py-8 bg-white w-full h-full m-0 dark:bg-[#101010] flex items-center">
        Filters:
        {filters.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleFilter(idx)}
            className={
              currentSelectedFilter === idx
                ? `dark:bg-zinc-600 w-fit cursor-pointer px-2 py-1 rounded-3xl text-xs`
                : `border w-fit cursor-pointer hover:bg-gray-200 border-zinc-700 px-2 py-1 rounded-3xl text-xs dark:hover:bg-zinc-600`
            }
          >
            {item}
          </button>
        ))}
      </div>
      {toShowData.length === 0 ? (
        <h2>No data</h2>
      ) : (
        toShowData.map((data) => (
          <div
            key={data._id}
            className="border flex flex-col text-left border-zinc-700 p-4 max-w-[750px] rounded-lg"
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">{data.title}</h2>
              <p className="bg-green-500 text-black py-1 px-3 h-fit rounded-lg text-xs font-semibold">
                {data.type === "ANAGRAM"
                  ? "ANAGRAM " + data.anagramType
                  : data.type}
              </p>
            </div>

            {data.type === "MCQ" && data.options && (
              <div className="mt-4">
                {data.options.map((option, idx) => {
                  const questionState = selectedAnswers[data._id] || {};
                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        handleOptionClick(
                          data._id,
                          idx,
                          option.isCorrectAnswer
                        )
                      }
                      className={`flex border py-1 px-2 my-2 rounded-lg items-center cursor-pointer ${
                        questionState.selectedIdx === idx
                          ? questionState.isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "border-zinc-700 hover:bg-zinc-700"
                      }`}
                    >
                      <label>{option.text}</label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DisplaySearchResult;
