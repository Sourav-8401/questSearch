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


//   function to multiple the array 5X seamless looping

  function repeatSentence(sentences) {
    const repeatedSentences = [];
    for (let i = 0; i < 5; i++) {
      repeatedSentences.push(...sentences);
    }
    return repeatedSentences;
  }
  const repeatedSentenceRow1 = repeatSentence(row1);
  const repeatedSentenceRow2 = repeatSentence(row2);

// ---------------------------------------------------------------

  return (
    <div className={"overflow-hidden relative mt-5 w-[750px] "}>
      <div className="bg-gradient-to-r absolute dark:from-[#101010] from-[#fff]  z-50 w-32 h-24 to-transparent"></div>
      <div className="flex  animate-marquee p-2 gap-5">
        {repeatedSentenceRow1.map((sentence, ind) => (
          <button onClick={()=>handleSearch(sentence)} className="dark:bg-zinc-800 bg-gray-100  inline-flex rounded-xl ps-2 pe-4 min-w-fit py-1 ">
            {sentence}
          </button>
        ))}
      </div>
      <div className="flex animate-marquee-reverse  button-2 gap-5">
        {repeatedSentenceRow2.map((sentence, ind) => (
          <button className="dark:bg-zinc-800 inline-flex bg-gray-100 rounded-xl ps-2 pe-4 min-w-fit py-1  ">
            {sentence}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-l float-right absolute right-0 top-0 z-50 from-[#fff]  dark:from-[#101010] w-32 h-24  to-transparent"></div>
    </div>
  );
}

export default MovingSuggestion;
