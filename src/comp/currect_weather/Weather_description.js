import React from 'react'

export default function Weather_description(args) {
    
    
    // const data = args.data; 
    // const city_name = data['name'];
    // const desc = data['weather'][0]['description'];
    // const humidity = data['main']['humidity'];
    // const feels_like = data['main']['feels_like'];
    // const temp = data['main']['temp'];
    // const clouds = data['clouds']['all'];
    
    return (
        <div className='flex w-full justify-between px-5 pt-1 text-xl'>
            <span>{args.title}</span>
            <span className='text-gray-400'>{args.text}</span>
        </div>
    )
}
