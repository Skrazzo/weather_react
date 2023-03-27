import React from 'react'
import Img from "./Weather_img";
import Weather_description from './Weather_description';
import { GeoAltFill } from 'react-bootstrap-icons';

export default function Weather_card(args) {
    try{
        const data = args.data; 
        const country = data['sys']['country'];
        const city_name = data['name'];
        const desc = data['weather'][0]['description'];
        const humidity = data['main']['humidity'];
        const feels_like = data['main']['feels_like'];
        const temp = data['main']['temp'];
        const clouds = data['clouds']['all'];

        return (
            <div className='image bg-gradient-to-tr from-green-400 to-lime-400'>
                
                <p className='flex gap-2 items-center'><GeoAltFill /> {city_name}, {country}</p>
                <div className='flex justify-center'>
                    <Img icon={args.data["weather"]["0"]["icon"]} size="4" />

                </div>
                <div>
                    <p className='temp'>{temp}°C</p>
                    <p className='desc'>{desc}</p>
                </div>
                
            </div>
        )

    }catch{

    }
}
