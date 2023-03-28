import React from 'react'
import Img from './Weather_img';

export default function Day_card(args) {
    function select_day(){
        if(args.day_index !== null){

            args.set_current_day(args.day_index);
        }
    }
    
    

    return (
        <div onClick={select_day} className={((args.today) ? "today" : "") +' shadow flex flex-col align-center rounded text-center py-2'}>
            <p className='font-bold'>{args.day}</p>
            <Img icon={args.icon} size="4"/>
            <p className='text-sm sm:text-md'>{args.temp + " °C"}</p>

        </div>
    )
}
