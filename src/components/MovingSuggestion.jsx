import React, { useState } from "react";

function MovingSuggestion() {
  const row1 = [
    "⭐ Rearrange the letters to form a word",
    "🤣 ANAGRAM",
    "🤓 Rearrange the words to form a sentence",
    "🪽 Since we haven't met before,",
  ];
  const row2 = [
    "🏈 Our final decision was beneficial for both parties.",
    "🐥 When I go on a trip, I choose shoes that I can wear many times.",
    "🤩 How do you stay updated with the latest trends in human resources?",
    "🙌 Rearrange the words to form a sentence",
    "🎢 When I go on a trip, I choose shoes that I can wear many times.",
  ];

  function search(question){

  }
  const [toSearch, setToSearch] = useState("");


  //   function for multiple the array 3X seamless looping

  function repeatSentence(sentences) {
    const repeatedSentences = [];
    for (let i = 0; i < 3; i++) {
      repeatedSentences.push(...sentences);
    }
    return repeatedSentences;
  }
  const repeatedSentence1 = repeatSentence(row1);
  const repeatedSentence2 = repeatSentence(row2);

// ---------------------------------------------------------------

  function handleSearch(question){
    const rectifiedQuestion = question.slice(2).trim();
    console.log(rectifiedQuestion); 

  }

  return (
    <div className={"overflow-hidden relative mt-5 w-[750px] h-[200px]"}>
      <div className="bg-gradient-to-r absolute from-[#101010] z-50 w-32 h-24 to-transparent"></div>
      <div className="flex animate-marquee  p-2 gap-5">
        {repeatedSentence1.map((sentence, ind) => (
          <button onClick={()=>handleSearch(sentence)} className="bg-zinc-800 inline-flex rounded-xl ps-2 pe-4 min-w-fit py-1 ">
            {sentence}
          </button>
        ))}
      </div>
      <div className="flex animate-marquee-reverse  button-2 gap-5">
        {repeatedSentence2.map((sentence, ind) => (
          <button className="bg-zinc-800 inline-flex rounded-xl ps-2 pe-4 min-w-fit py-1  ">
            {sentence}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-l float-right absolute right-0 top-0 z-50 from-[#101010] w-32 h-24  to-transparent"></div>
    </div>
  );
}

export default MovingSuggestion;
