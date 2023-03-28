import React, {useState, useEffect} from 'react'
import "./scss/WeatherPage.scss";
import { useParams } from 'react-router-dom';
import { get_current_data, get_4hour_forecast } from '../public/api_call';
import Weather_card from '../comp/current_weather/Weather_card';
import Weather_description from '../comp/current_weather/Weather_description';
import { v4 as uuidv4 } from 'uuid';
import { // some functions that are separated
    get_average_temp_from_forecast,
    get_icons_from_forecast,
    get_day_info
} from '../public/functions';
import Day_card from '../comp/current_weather/Day_card';
import { Button } from '@mantine/core';

// variables go after imports
var d2d = require('degrees-to-direction');


export default function WeatherPage() {
    const global_dt = new Date();
    const [weather_api, set_weather_api] = useState(null);
    const [hour_forecast, set_4hour_api] = useState(null);
    const [current_selected_day, set_current_selected_day] = useState(0); // currently selected item from list
    
    const route_args = useParams(); // arguments from the link

    // variables for next day average forecast
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekdays_full = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var average_temp_forecast = [];
    var average_icons_forecast = [];


    // load all data about weather in the selected city
    // load it only once, when the page is rendered
    useEffect( () => {
        
        get_current_data(route_args.query, set_weather_api); // function that gets data for current weather
        get_4hour_forecast(route_args.query, set_4hour_api); // 
        
    }, []);



    //console.log(weather_api);
    //console.log(hour_forecast);
    
    // set some variables that will be needed later
    try{
        average_temp_forecast = get_average_temp_from_forecast(hour_forecast.list);
        average_icons_forecast = get_icons_from_forecast(hour_forecast.list);
    }catch{

    }


    try{
        return (
            <div className='bg-overlay'>
                <div className='main_container gap-2 container mx-auto xl:max-w-2xl'>
                    <div className='weather_main_card shadow-2xl mx-2 grid grid-cols-1 sm:grid-cols-3'>
                        <Weather_card data={weather_api} />
                        
                        <div className='col-span-2 py-5'>
                            <Weather_description title="Feels like" text={weather_api.main.feels_like + " °C"}/>
                            <Weather_description title="Humidity" text={weather_api.main.humidity + " %"}/>
                            <Weather_description title="Clouds" text={weather_api.clouds.all + " %"}/>
                            <Weather_description title="Wind" text={weather_api.wind.speed + " km/h"}/>
                            <Weather_description title="Wind direction" text={d2d(weather_api.wind.deg)}/>

                            <div className='day-forecast flex sm:grid grid-cols-5 mx-5 gap-2'>
                                {average_temp_forecast.map((x, i) => {
                                    // i = index
                                    const dt = new Date();
                                    return <Day_card key={uuidv4()} set_current_day={set_current_selected_day} day_index={i} today={(i === current_selected_day) ? true : false} temp={x} icon={average_icons_forecast[i]} day={weekdays[dt.getDay() + i - 1]}/>;
                                })}
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='weather_main_card mx-2 px-5 py-3'>
                        <p className='text-xl font-bold my-2 italic'>{weekdays_full[global_dt.getDay() + current_selected_day - 1]}</p>
                        <div className='day-forecast flex sm:grid grid-cols-5 gap-2'>
                            {get_day_info(hour_forecast.list, current_selected_day).map((x) => {
                                const dt = new Date(x.dt * 1000);
                                var hours = ((dt.getHours() < 10) ? "0" : "") + dt.getHours();
                                var minutes = ((dt.getMinutes() < 10) ? "0" : "") + dt.getMinutes();
                                

                                return <Day_card key={uuidv4()} set_current_day={null} day_index={null} today={null} temp={x.main.temp} icon={x['weather'][0]['icon']} day={hours +":"+ minutes}/>;
                            })}

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
