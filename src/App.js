import React,{useEffect,useState} from 'react';
import './App.css';
import Forecasts from './Forecasts';
const App=()=>{
	const API_KEY='';
	const [search,setSearch]=useState('');
  const [query,setQuery]=useState("Jamaica");
  const [forecasts,setForecasts]=useState([]);
	useEffect(()=>{
    getCity();
	},[query]);
	const getCity=async()=>{
		const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
		const data = await response.json();
    setForecasts(data);
		console.log(data);
	}
  const updateSearch=e=>{
    setSearch(e.target.value);
  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
	return(
		<div className="App">
      <h1> WeatherFethcher - React App</h1>
        	<form onSubmit={getSearch} className="search-form">
			<input  className="search-bar" type="text" value={search} onChange={updateSearch}/>
			<button className="search-button" type="submit">Search</button>
			</form>
      <div className="test">
        
          <Forecasts
           image={`http://openweathermap.org/img/w/${forecasts.weather[0].icon}.png`}
          mainCond={forecasts.weather[0].main}

          cond={forecasts.weather[0].description}
            location={forecasts.name}
            
            maxTemp={Math.floor(forecasts.main.temp_max)}
            minTemp={Math.floor(forecasts.main.temp_max)}
            feelsLike={forecasts.main.feels_like}
          
          />
      
        </div>
      </div>
		);
};
export default App;
