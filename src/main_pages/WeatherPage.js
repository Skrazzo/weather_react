import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./scss/WeatherPage.scss";
import Img from '../comp/currect_weather/Weather_img';
import { useParams } from 'react-router-dom';
import { get_current_data } from '../public/api_call';


export default function WeatherPage() {
    const [weather_api, set_weather_api] = useState(null);
    const route_args = useParams();


    // load all data about weather in the selected city
    // load it only once, when the page is rendered
    useEffect( () => {
        
        get_current_data(route_args.query, set_weather_api);
    }, []);

    
    try{
        return (
            <div className='bg-overlay'>
                <div className='main_container container mx-auto xl:max-w-xl'>
                    <div className='weather_main_card'>
                        <Img icon={weather_api["weather"]["0"]["icon"]} size="4" />
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
