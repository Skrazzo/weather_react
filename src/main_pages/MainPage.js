import React, { useState } from "react";
import "../public/tailwindcss.css";
import "./scss/MainPage.scss";
import Search from '../comp/search/Search';
import Suggestion from '../comp/search/Suggestion';
import { v4 as uuidv4 } from 'uuid';








function MainPage() {
  const [suggestion, setSuggestion] = useState([]);

  

  return (
    <div className='bg-overlay'>
      <div className='main_container container mx-auto xl:max-w-xl'>
        <Search setSuggestion={setSuggestion}/>

        <div className='suggestion-container'>
          {suggestion.map(x => {
            return <Suggestion key={uuidv4()} text={x.target} />;
          })}
          
          

        </div>
      </div>

    </div>
  );
}

export default MainPage;
