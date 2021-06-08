import React from 'react';

const Forecasts=({mainCond,cond,location,maxTemp,minTemp,feelsLike,image})=>{
    return(
        <div className='test'>
            <h1>{location}</h1>
            <img className src={image} alt=""/>
            <h1>{mainCond}</h1>
            <p>Condition description:{cond}</p>

            <p> The maximum temperature today is {maxTemp} ° C</p>
            <p> The minimum temperature today is {minTemp} ° C</p>
            <p> Feels like {feelsLike} ° C</p>
            </div>
    );
}
export default Forecasts;
