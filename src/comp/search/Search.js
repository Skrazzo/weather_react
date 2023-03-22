import React, {useRef} from 'react'
import "./Search.scss";
import { SearchHeart } from 'react-bootstrap-icons';
import $ from "jquery";
import cities from "../../public/cities.json";
import { useNavigate } from 'react-router-dom';

var stringSimilarity = require("string-similarity");


// this variable is needed to see when search is selected


setInterval(() => {
    const sr_input = $(".search-input")[0];

    if(document.activeElement === sr_input){
        // change bg-overlay css 
        if(!$(".bg-overlay").hasClass("search-input-focus")){
            $(".bg-overlay").addClass("search-input-focus");
        }
    }else{
        if($(".bg-overlay").hasClass("search-input-focus")){
            $(".bg-overlay").removeClass("search-input-focus");
        }
    }
}, 200);

export default function Search(args) {
    const navigate = useNavigate();

    function change_class_t_suggestion(bool){
        // if true, then change to suggestion class
        if(bool){
            $(".search_container").addClass("search_container_suggestion").removeClass("search_container");
        }else{
            $(".search_container_suggestion").addClass("search_container").removeClass("search_container_suggestion");
        }
    }

    

    function returnSearch(query){
        const return_arr = cities.filter((e) => {
            return e.toLowerCase().includes(query.toLowerCase());
        });

        return return_arr;
    }

    function onSearchChangeHandler(e){
        const text = e.target.value;
        
        if(text === ""){
            change_class_t_suggestion(false);
            args.setSuggestion([]);
        }else{
            change_class_t_suggestion(true);
            // get array of cities, that have exact query
            var arr = returnSearch(text);
            if(arr.length === 0){ // if array isnt empty
                args.setSuggestion([]);
                change_class_t_suggestion(false);
                return;
            }

            
            // find best matching city by similarity
            var matches = stringSimilarity.findBestMatch(text, arr); 
            var suggestions = [];

            if(matches.ratings.length > 0){
                var filter_matches = matches.ratings.filter((x) => {
                    if(x.target !== matches.bestMatch.target){
                        // if city isnt the best match one, and its rating is above 0.6
                        // then return it as array
                        if(x.rating >= 0.5){
                            return x.target;
                        }
                    }
                    return null; // this is here just to fix warning
                });
                suggestions = [matches.bestMatch, ...filter_matches];
                
            }

            // full array of suggestions
            //console.log(suggestions);

            if(suggestions.length === 1){ // only one suggestion
                args.setSuggestion([suggestions[0]]);
            }else if(suggestions.length > 1){ // more than one
                args.setSuggestion([suggestions[0], suggestions[1]]);
            }
            //return suggestions;

        }
    }

    const search_ref = useRef(); // get text from search input
    function submitHandler(){
        const searched_city = search_ref.current.value;
        navigate("/weather/"+ searched_city); // switch to another page
    }


    return (
        <div className='search_container'>
            <input ref={search_ref} onChange={onSearchChangeHandler} type="text" className='search-input' placeholder='Enter a city'/>
            <button onClick={submitHandler}><SearchHeart/></button>
        </div>
    )
}
