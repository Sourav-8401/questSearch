import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
function SearchBox() {
  
  const [searchBoxOn, setSearchBoxOn] = useState(false);

  function change(e){
    console.log(e.target.value);
  }

  const row2 = [
    "Our final decision was beneficial for both parties.",
    "When I go on a trip, I choose shoes that I can wear many times.",
    "How do you stay updated with the latest trends in human resources?",
    "Rearrange the words to form a sentence",
    "When I go on a trip, I choose shoes that I can wear many times.",
  ];








  return (
    <div>
    <div className="overflow-hidden max-h-[70px]  flex justify-start gap-2 relative w-[750px] mt-[25px] p-2 rounded-3xl border border-gray-2mb-1000 bg-background dark:border-gray-800">
      <div>
        <img src="/icon.png" alt="" className="w-12 rounded-lg mt-1.5" />
      </div>
      <form
        action=""
        className="w-full relative flex justify-between items-center py-3 px-1 bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-1000"
      >
        <textarea
          name=""
          id=""
          onFocus={change}
          className="w-full relative text-sm sm:text-base scrollbar-none resize-none z-50 border-none dark:text-white bg-transparent  h-full rounded-xl focus:outline-none focus:ring-0 pl-3 pr-20"
        ></textarea>
        <button className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-10 rounded-full transition duration-200 flex items-center  justify-center">
          <IoIosArrowForward />
        </button>
      </form>
    </div>
      
      {/* <div className="flex flex-col float-start gap-y-3 ms-16 mt-3 text-left">
      {
        row2.map(sentence=>(
          <p>{sentence}</p>
        ))
      }
      </div> */}
    </div>
  );
}

export default SearchBox;
