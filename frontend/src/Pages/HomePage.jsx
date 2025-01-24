import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import MovingSuggestion from "../components/MovingSuggestion";
import axios from "axios";
function HomePage() {
  return (
    <div className="mt-32">
      
      <h1 className="text-orange-400 text-6xl mb-10 font-bold">QuestSearch</h1>
      <SearchBox />
    </div>
  );
}

export default HomePage;
