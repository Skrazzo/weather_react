import React from 'react';
import './Recent.scss';
import { ClockHistory } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function Recent(args) {
    const recent = JSON.parse(args.recent);
    const navigate = useNavigate();

    if(recent !== null){
        return (
            <div className='Recent-container'>
                {recent.map((x) => {
                    if(x !== ''){
                        return (<span onClick={() => {navigate('/w/'+ x)}} ><ClockHistory /> {x}</span>);
                    }
                })}   
                
                
            </div>
        )

    }else{
        return (<></>);
    }
}
