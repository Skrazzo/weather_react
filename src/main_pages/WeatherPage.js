import React, {useState, useEffect} from 'react'
import "./scss/WeatherPage.scss";
import { useNavigate, useParams } from 'react-router-dom';
import { get_current_data, get_4hour_forecast } from '../public/api_call';
import Weather_card from '../comp/current_weather/Weather_card';
import Weather_description from '../comp/current_weather/Weather_description';
import { v4 as uuidv4 } from 'uuid';
import { // some functions that are separated
    get_average_temp_from_forecast,
    get_icons_from_forecast,
    get_day_info,
    get_chart_labels,
    get_chart_values
} from '../public/functions';
import Day_card from '../comp/current_weather/Day_card';
import { Tooltip } from '@mantine/core';
import { ThermometerHalf, Droplet, Cloud } from 'react-bootstrap-icons';
import { Chart } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import BackButton from '../comp/BackButton';
// variables go after imports
const d2d = require('degrees-to-direction');


export default function WeatherPage() {
    const global_dt = new Date();
    const [weather_api, set_weather_api] = useState(null);
    const [hour_forecast, set_4hour_api] = useState(null);
    const [current_selected_day, set_current_selected_day] = useState(0); // currently selected item from list
    const [chart_data, set_chart_data] = useState({"chart": 0, "data":{labels: ["1"], datasets: [ { label: "Temperature", backgroundColor: "rgb(255, 99, 132)", borderColor: "rgb(255, 99, 132)", data: ["1"], }, ], }});

    const route_args = useParams(); // arguments from the link
    const navigate = useNavigate();
    // variables for next day average forecast
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekdays_full = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var average_temp_forecast = [];
    var average_icons_forecast = [];

    // load all data about weather in the selected city
    // load it only once, when the page is rendered
    useEffect( () => {
        
        
        get_current_data(route_args.query, set_weather_api); // function that gets data for current weather
        get_4hour_forecast(route_args.query, set_4hour_api, drawChart); // 
        check_city_exists(route_args.query);
    }, []);


    //console.log(weather_api);
    //console.log(hour_forecast);
    
    // set some variables that will be needed later
    try{
        average_temp_forecast = get_average_temp_from_forecast(hour_forecast.list);
        average_icons_forecast = get_icons_from_forecast(hour_forecast.list);
        
        //get_chart_labels(hour_forecast.list, current_selected_day);
        //get_chart_values(hour_forecast.list, 2, current_selected_day)
    }catch{

    }

    function drawChart(day, chart = chart_data.chart, custom_hour_forecast = null){
        
        var labels;
        if(custom_hour_forecast !== null){ // on first load, this will called with api recieved data
            labels = get_chart_labels(custom_hour_forecast.list, day);
            
        }else{
            labels = get_chart_labels(hour_forecast.list, day);
        }
        
        // for every button needs to have it own label
        var datasetLabel = "Temperature";
        switch(chart){
            case 1:
                datasetLabel = "Humidity";
                break;
            case 2:
                datasetLabel = "Clouds";
                break;
        }

        const data = {
            labels: labels,
            datasets: [
                {
                    label: datasetLabel,
                    backgroundColor: "#32CD32",
                    borderColor: "#32CD32",
                    data: get_chart_values((custom_hour_forecast !== null) ? custom_hour_forecast.list : hour_forecast.list, chart, day),
                },
            ],
        };
    
        
        set_chart_data({"chart": chart, "data": data});
    }

    function check_city_exists(city){
        var get_city_url = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ process.env.REACT_APP_API_KEY;
        axios.get(get_city_url).then((data) => {
            if(data.data.length === 0){
                navigate("../error");
            }
        });
    }

    try{
        return (
            <div className='bg-overlay'>
                <BackButton />
                <div className='main_container gap-2 container mx-auto xl:max-w-2xl'>
                    <div className='weather_main_card mt-10 xl:mt-0 shadow-2xl mx-2 grid grid-cols-1 sm:grid-cols-3'>
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

                                    
                                    // index of day of the week 0 = monday
                                    var day_card_index = dt.getDay() + i - 1; 
                                    
                                    
                                    // if day index is 7 set it to 0 so that it means it monday
                                    day_card_index = (day_card_index >= 7) ? day_card_index -= 7 : day_card_index; 
                                    // if day index is below zero for example -1 which equals sunday
                                    // then we should do weekdays.length + day_card_index, so the program takes sunday
                                    // we need to put + because - + - = + and in the end it would be 8
                                    // since for some reason -1 doesn't fucking work
                                    day_card_index = (day_card_index < 0) ? weekdays.length + day_card_index : day_card_index;
                                    

                                    return <Day_card drawChart={drawChart} key={uuidv4()} set_current_day={set_current_selected_day} day_index={i} today={(i === current_selected_day) ? true : false} temp={x} icon={average_icons_forecast[i]} day={weekdays[day_card_index]}/>;
                                })}
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='weather_main_card mx-2 px-5 py-3'>
                        {/* dont touch that paragraph please */}
                        <p className='text-xl font-bold my-2 italic'>{weekdays_full[((global_dt.getDay() + current_selected_day - 1) >= 7 ? global_dt.getDay() + current_selected_day - 1 - 7: global_dt.getDay() + current_selected_day - 1 )]}</p>
                        <div className='day-forecast flex sm:grid grid-cols-5 gap-2'>
                            {get_day_info(hour_forecast.list, current_selected_day).map((x) => {
                                
                                const dt = new Date(x.dt * 1000);
                                var hours = ((dt.getHours() < 10) ? "0" : "") + dt.getHours();
                                var minutes = ((dt.getMinutes() < 10) ? "0" : "") + dt.getMinutes();
                                

                                return <Day_card key={uuidv4()} set_current_day={null} day_index={null} today={null} temp={x.main.temp} icon={x['weather'][0]['icon']} day={hours +":"+ minutes}/>;
                            })}

                        </div>
                    </div>

                    <div className='weather_main_card mx-2 px-5 py-3'>
                        <div className='flex gap-1'>
                            <Tooltip color="limegreen" transitionProps={{ transition: 'rotate-right', duration: 300 }} withArrow label="Temperature">
                                <button onClick={() => {drawChart(current_selected_day, 0)}} className={"btn " + ((chart_data.chart === 0) ? "selected" : "")}><ThermometerHalf/></button>
                            </Tooltip>

                            <Tooltip color="limegreen" transitionProps={{ transition: 'rotate-right', duration: 300 }} withArrow label="Humidity">
                                <button onClick={() => {drawChart(current_selected_day, 1)}} className={"btn " + ((chart_data.chart === 1) ? "selected" : "")}><Droplet/></button>
                            </Tooltip>

                            <Tooltip color="limegreen" transitionProps={{ transition: 'rotate-right', duration: 300 }} withArrow label="clouds">
                                <button onClick={() => {drawChart(current_selected_day, 2)}} className={"btn " + ((chart_data.chart === 2) ? "selected" : "")}><Cloud/></button>
                            </Tooltip>

                        </div>

                        <div>
                            <Line data={chart_data.data} />
                        </div>
                        
                    </div>
                </div>

            </div>
        )

    }catch{ // error, this will hapen when page is loaded for the first time
        // after api call gets completed, the page will reload with all necessery information
        return (
            <div className='bg-overlay'>
                
                <div className='main_container h-screen container mx-auto xl:max-w-xl'>
                    
                </div>
            </div>
        )
    }
}
