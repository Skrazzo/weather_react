export function get_average_temp_from_forecast(arr){
  
    var average_temp = [];
    var temp = 0;

    
    // five day forecast
    for(var i = 0; i < 5; i++){
        var temp_arr = get_day_info(arr, i);
        temp_arr.map(x => { // loop through whole day and sum temperature
            temp += x.main.temp;
        });

        // get average temperature
        average_temp.push((temp / temp_arr.length).toFixed(2));
    }

    return average_temp;
  
}

export function get_icons_from_forecast(arr){
    var temp = [];
    for(var i = 4; i < arr.length; i += 8){
        temp.push(arr[i]['weather'][0]['icon']);
    }

    return temp;
}

export function get_day_info(arr, day_index = 0){
    
    
    var recording = false;
    var temp = [];

    for(var i = 0; i < arr.length; i++){
        var time = arr[i].dt_txt.split(" ")[1];
        if(time === "00:00:00"){ // new day started
            // if recording is enabled when reached 00:00:00
            // that means that we have reached day that shouldn't be returned
            if(recording){ 
                break;
            }

            if(day_index === 0){ // if reached day that should be returned
                recording = true;
            }else{
                day_index--;
            }
        }

        if(recording){
            temp.push(arr[i]);
        }

    }

    return temp;
}

// function that exports needeed chart labels from selected day and given array
export function get_chart_labels(arr, day_index = 0){

    var labels = get_day_info(arr, day_index).map((x) =>{
        const dt = new Date(x.dt * 1000);
        var hours = ((dt.getHours() < 10) ? "0" : "") + dt.getHours();
        var minutes = ((dt.getMinutes() < 10) ? "0" : "") + dt.getMinutes();
        return hours + ":" + minutes;
    });

    return labels
}

// function that exports selected chart values from selected day and given array
export function get_chart_values(arr, chart, day_index = 0){
    var values = [];
    
    switch(chart){
        case 0: // temperature
            values = get_day_info(arr, day_index).map((x) =>{
                return x.main.temp;
            });
            break;
        case 1:
            values = get_day_info(arr, day_index).map((x) =>{
                return x.main.humidity;
            });
            break;
        case 2:
            values = get_day_info(arr, day_index).map((x) =>{
                return x.clouds.all;
            });
            break;
        
    }
    return values;
}
