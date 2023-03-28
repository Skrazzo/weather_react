import React from 'react'
import MainPage from './main_pages/MainPage';
import WeatherPage from './main_pages/WeatherPage';
import {
  BrowserRouter,
  //useNavigate,
  Routes,
  Route
} from "react-router-dom";



export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />}/>
        <Route path='/weather/:query' element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>

    
  )
}
