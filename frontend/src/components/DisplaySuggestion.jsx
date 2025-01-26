import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
function DisplaySuggestion({suggestionData, handleTypingSuggestionClick}) {
  return (
    <>
    {suggestionData.length > 0 && (
        <div className="flex flex-col w-[676px] gap-y-1 ms-16 mt-3 text-left">
          {suggestionData.map((sentence) => (
            <p
              key={sentence._id}
              onClick={()=>(handleTypingSuggestionClick(sentence.title))}
              className="inline-flex gap-4 cursor-pointer hover:bg-zinc-800 w-full py-0.5 px-2 rounded-xl"
            >
              <IoSearchSharp className="relative top-[6px]" /> {sentence.title}
            </p>
          ))}
        </div>
      )}
    </>
  )
}

export default DisplaySuggestion