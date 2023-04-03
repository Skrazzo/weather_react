import React, { useState, useEffect } from "react";
import "../public/tailwindcss.css";
import "./scss/MainPage.scss";
import Search from '../comp/search/Search';
import Suggestion from '../comp/search/Suggestion';
import { v4 as uuidv4 } from 'uuid';
import { Notifications } from '@mantine/notifications';

// if true, then error message has already been displayed
var error_notification = false;

function MainPage() {
    const [suggestion, setSuggestion] = useState([]);

    

    useEffect(() => {
        // Most used notification props
        if(!error_notification){

            Notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                title: "There has been an error!?!",
                message: "Looks that city name that you entered, doesn't exist :(",
                color: 'red',
                loading: false,
            });
            error_notification = true;
        }
    },[]);
    

    return (
        <div className='bg-overlay h-screen'>
            <Notifications />
            <div className='main_container container h-full mx-auto xl:max-w-xl'>
                <Search setSuggestion={setSuggestion}/>

                <div className='suggestion-container mx-3'>
                {suggestion.map(x => {
                    return <Suggestion key={uuidv4()} text={x.target} />;
                })}
                
                

                </div>
            </div>

        </div>
    );
}

export default MainPage;
