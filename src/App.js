import React,{useEffect,useState} from 'react';
import './App.css';
import Forecasts from './Forecasts';
const App=()=>{
	const API_KEY='YOURKEYHERE';
	const [search,setSearch]=useState('Jamaica');
  const [query,setQuery]=useState("Jamaica");
  const [forecasts,setForecasts]=useState([]);
  const [responseObj,setResponseObj]=useState({});

	useEffect(()=>{
    getCity();
	},[query]);
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
	const getCity=async()=>{
		const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
		const data = await response.json();
    setForecasts(data);
    setResponseObj(data);
		console.log(responseObj);
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
		<div className={(typeof forecasts.main != "undefined") ? ((forecasts.main.temp > 16) ? 'app-warm' : 'app-cold') : 'app-neutral'}>
      <h1> WeatherFetcher - React App</h1>
        	<form onSubmit={getSearch} className="search-form">
			<input  className="search-bar" type="text" value={search} onChange={updateSearch}/>
			<button className="search-button" type="submit">Search</button>
			</form>
      <br></br>
      {(typeof forecasts.main != "undefined") ? (
      <div className="test">
        
                    <div className="date">{dateBuilder(new Date())}</div>
          <Forecasts
         
         mainCond={forecasts.weather[0].main}
        country={forecasts.sys.country}
         cond={forecasts.weather[0].description}
           location={forecasts.name}
           actTemp={Math.floor(forecasts.main.temp)}
           maxTemp={Math.floor(forecasts.main.temp_max)}
           minTemp={Math.floor(forecasts.main.temp_min)}
           feelsLike={forecasts.main.feels_like}
         
           image={`http://openweathermap.org/img/w/${forecasts.weather[0].icon}.png`}
         />
            
           
         
      
        </div>
         ): ('')}
      </div>
     
		);
};
export default App;
