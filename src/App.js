import React, { useState } from "react";
import axios from 'axios';
import "./tailwindcss.css";
import "./scss/app.scss";
import Search from './comp/search/Search';
import Suggestion from './comp/search/Suggestion';


var city = "cesis";


function get_city_json(name){
  var get_city_url = "http://api.openweathermap.org/geo/1.0/direct?q="+ name +"&limit=1&appid="+ process.env.REACT_APP_API_KEY;

  axios.get(get_city_url).then((data) => {
    if(data.status == 200){ // got city lon, lat
      data = data.data[0];
      const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ data.lat +"&lon="+ data.lon +"&appid="+ process.env.REACT_APP_API_KEY+ "";
      
      // request for weatheri in the city
      axios.get(api_url).then((data) => {
        if(data.status == 200){
          data = data.data;
          console.log(data);
          return data;
        }
      });
    }
  });
}



function App() {
  const [suggestion, setSuggestion] = useState([]);

  

  return (
    <div className='bg-overlay'>
      <div className='main_container container mx-auto xl:max-w-xl'>
        <Search setSuggestion={setSuggestion}/>

        <div className='suggestion-container'>
          {suggestion.map(x => {
            console.log("recv",suggestion);
            return <Suggestion text={x.target} />;
          })}
          
          

        </div>
      </div>

    </div>
  );
}

export default App;
