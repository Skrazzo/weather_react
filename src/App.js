import React from 'react'
import MainPage from './main_pages/MainPage';
import WeatherPage from './main_pages/WeatherPage';
import WeatherPageError from "./main_pages/MainPage_error";
import {
  BrowserRouter,
  //useNavigate,
  Routes,
  HashRouter,
  Route
} from "react-router-dom";



export default function App() {
  return (
    
    <HashRouter >
      <Routes>
        <Route index  element={<MainPage />}/>
        <Route path='/w/:query' element={<WeatherPage />} />
        <Route path='/error' element={<WeatherPageError />} />
      </Routes>
    </HashRouter>

    
  )
}
