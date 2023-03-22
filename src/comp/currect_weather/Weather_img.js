import React from 'react'


export default function Weather_img(args) {
    return (
        <img alt="Just an" src={'https://openweathermap.org/img/wn/'+ args.icon +'@'+ args.size +'x.png'}/>
    )
}
