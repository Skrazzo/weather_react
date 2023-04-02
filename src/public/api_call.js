import axios from "axios";
import { useNavigate } from 'react-router-dom';




export function get_current_data(city, set_weather_api){
    var get_city_url = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ process.env.REACT_APP_API_KEY;

    axios.get(get_city_url).then((data) => {
        
        if(data.status === 200){ // got city lon, lat
            if(data.data.length !== 0){
                data = data.data[0];
                const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ data.lat +"&lon="+ data.lon +"&appid="+ process.env.REACT_APP_API_KEY+ "";
                
                // request for weatheri in the city
                axios.get(api_url).then((data) => {
                    if(data.status == 200){
                        data = data.data;
                        set_weather_api(data);
                        
                        
                    }
                });

            }
        }
    });
}

export function get_4hour_forecast(city, set_4hour_api, drawChart = null){
    var get_city_url = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ process.env.REACT_APP_API_KEY;

    axios.get(get_city_url).then((data) => {
        if(data.status == 200){ // got city lon, lat
            data = data.data[0];
            
            if(data !== undefined){
                const api_url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat="+ data.lat +"&lon="+ data.lon +"&appid="+ process.env.REACT_APP_API_KEY+ "";
                
                // request for weatheri in the city
                axios.get(api_url).then((data) => {
                    if(data.status == 200){
                        data = data.data;
                        set_4hour_api(data);
                        
                        //console.log(data);
                        if(drawChart !== null){
                            drawChart(0,0,data);
                        }
                    }
                });
            }
        }
    });
}