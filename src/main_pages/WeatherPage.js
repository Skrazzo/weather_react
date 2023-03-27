import React, {useState, useEffect} from 'react'
import "./scss/WeatherPage.scss";
import { useParams } from 'react-router-dom';
import { get_current_data, get_4hour_forecast } from '../public/api_call';
import Weather_card from '../comp/currect_weather/Weather_card';
import Weather_description from '../comp/currect_weather/Weather_description';
var d2d = require('degrees-to-direction');

export default function WeatherPage() {
    const [weather_api, set_weather_api] = useState(null);
    const [hour_forecast, set_4hour_api] = useState(null);
    const route_args = useParams(); // arguments from the link


    // load all data about weather in the selected city
    // load it only once, when the page is rendered
    useEffect( () => {
        
        get_current_data(route_args.query, set_weather_api); // function that gets data for current weather
        get_4hour_forecast(route_args.query, set_4hour_api); // 
        
    }, []);

    //console.log(weather_api);
    //console.log(hour_forecast);
    try{
        var average_temp = [];
        var temp = 0;

        // calculate average of next day temperatures
        // (24 / 3) = 8 = how many indexes for one day
        for(var i = 0; i < hour_forecast.list.length; i++){
            if(i % (24 / 3) === 0 && i !== 0){ // a day has passed
                // to fixed funtion rounds up to needed decimals
                average_temp.push((temp / (24 / 3)).toFixed(2));
            }else{
                temp += hour_forecast.list[i].main.temp;
            }
        }

        average_temp.push((temp / (24 / 3)).toFixed(2));

        console.log("avg", average_temp);

    }catch{
        
    }

    try{
        return (
            <div className='bg-overlay'>
                <div className='main_container container mx-auto xl:max-w-2xl'>
                    <div className='weather_main_card shadow-2xl mx-2 grid grid-cols-3'>
                        <Weather_card data={weather_api} />
                        
                        <div className='col-span-2'>
                            <Weather_description title="Feels like" text={weather_api.main.feels_like + " °C"}/>
                            <Weather_description title="Humidity" text={weather_api.main.humidity + " %"}/>
                            <Weather_description title="Clouds" text={weather_api.clouds.all + " %"}/>
                            <Weather_description title="Wind" text={weather_api.wind.speed + " km/h"}/>
                            <Weather_description title="Wind direction" text={d2d(weather_api.wind.deg)}/>

                            
                        </div>
                    </div>
                    
                </div>
            </div>
        )

    }catch{ // error, this will hapen when page is loaded for the first time
        // after api call gets completed, the page will reload with all necessery information
        return (
            <div className='bg-overlay'>
                <div className='main_container container mx-auto xl:max-w-xl'>
                    
                </div>
            </div>
        )
    }
}
