import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faCloudSun, faCloudRain, faUmbrella, faDroplet, faArrowRight, faSnowflake, faSmog, faBolt, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { WeatherDetail } from "../models/WeatherDetail";
import { ReactTyped } from "react-typed";

export function Weather() {
    const [location, setLocation] = useState("Chicago");
    const [weatherData, setWeatherData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchWeather() {
        setIsLoading(true);
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=C2ZWGDPL89VM7XPZX7AQGY9CS&contentType=json`)
        fetchWeatherDetail(response);
    }

    function fetchWeatherDetail(response) {
        const data = new WeatherDetail(response.data.address, response.data.description);
        response.data.days.forEach((weather) => {
            data.addWeatherDetailByDay(weather.datetime, weather.temp, weather.tempmin, weather.tempmax, weather.humidity, weather.precip, weather.uvindex, weather.icon, weather.conditions);
        });
        setWeatherData(data);
        console.log(data);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }

    function handleLocationChange(event) {
        setLocation(event.target.value)
    }

    function getConditionIcon(icon) {
        switch (icon.toLowerCase()) {
            case "clear":
            case "clear-day":
            case "sunny":
                return { icon: faSun, color: "#FFDF22" };
            case "partly cloudy":
            case "cloudy":
                return { icon: faCloud, color: "#B0BEC5" };
            case "mostly sunny":
                return { icon: faCloudSun, color: "#FFD700" };
            case "rain":
            case "showers":
            case "rain, overcast":
                return { icon: faCloudRain, color: "#007BFF" }; 
            case "snow":
                return { icon: faSnowflake, color: "#00BFFF" };
            case "fog":
            case "haze":
                return { icon: faSmog, color: "#708090" };
            case "thunderstorm":
            case "storms":
                return { icon: faBolt, color: "#FF4500" };
            case "sleet":
                return { icon: faCloudShowersHeavy, color: "#4682B4" };
            default:
                return { icon: faCloud, color: "#B0BEC5" };
        }
    }

    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        const day = date.toLocaleDateString('en-US', options);
        return day === "Thursday" ? day.slice(0, 4): day.slice(0, 3);
    }

    useEffect(() => {
        fetchWeather();
    }, [])


    return (
        isLoading ? (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." />
            </div>
        ) : (<div>
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="row mt-5">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Location" onChange={handleLocationChange} />
                        <div className="input-group-append" onClick={fetchWeather}>
                            <button className="btn btn-outline-secondary" type="button"><FontAwesomeIcon icon={faArrowRight} onClick={fetchWeather} /></button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    {<h2 style={{ color: "#454545" }}>Right now in <b style={{ color: "#000000" }}><ReactTyped strings={[weatherData.location]} typeSpeed={200} /></b>, its {weatherData.dailyWeather[0].conditions}</h2>}
                </div>
                <div className="row mt-5">
                    <div className="col-3 pr-5">
                        <FontAwesomeIcon icon={getConditionIcon(weatherData.dailyWeather[0].icon).icon} style={{ width: "100px", height: "100px", color: getConditionIcon(weatherData.dailyWeather[0].icon).color }} />
                    </div>
                    <div className="col-5 px-5">
                        {weatherData && weatherData.dailyWeather && weatherData.dailyWeather.length > 0 ? <>
                            <div className="row"><p className="display-4">{weatherData.dailyWeather[0].temp}°</p></div>
                            <div className="row text-center"><p className="text-center">{weatherData.dailyWeather[0].tempmin} ° / {weatherData.dailyWeather[0].tempmax} °</p></div>
                        </> : <div className="row">
                            <p className="display-4">N/A</p>
                        </div>
                        }
                    </div>
                    <div className="col-4">
                        {weatherData && weatherData.dailyWeather && weatherData.dailyWeather.length > 0 ? <>
                            <div className="row"><div className="col-4"><FontAwesomeIcon icon={faCloudRain} style={{ width: "30px", height: "30px", color: "gray" }} /></div>
                                <div className="col"><p>{weatherData.dailyWeather[0].precip} %</p></div></div>
                            <div className="row pt-1"><div className="col-4"><FontAwesomeIcon icon={faUmbrella} style={{ width: "30px", height: "30px", color: "gray" }} /></div>
                                <div className="col"><p>{weatherData.dailyWeather[0].uvindex} W/m2</p></div></div>
                            <div className="row pt-1"><div className="col-4"><FontAwesomeIcon icon={faDroplet} style={{ width: "30px", height: "30px", color: "gray" }} /></div>
                                <div className="col"><p>{weatherData.dailyWeather[0].humidity} %</p></div></div>
                        </> : <div className="row">
                            <p className="display-4">N/A</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="row mt-5">
                    {weatherData && weatherData.dailyWeather && weatherData.dailyWeather.slice(1, 5).map((weather, i) => (
                        <div key={i} className="col-3 d-flex flex-column align-items-center">
                            <div className="row justify-content-center">
                                <FontAwesomeIcon
                                    icon={getConditionIcon(weather.icon).icon}
                                    style={{ width: "50px", height: "50px", color: getConditionIcon(weather.icon).color }}
                                />
                            </div>
                            <div className="row justify-content-center pt-2">
                                <p className="text-center">{weather.tempmin}°/{weather.tempmax}°</p>
                            </div>
                            <div className="row justify-content-center">
                                <p className="text-center">{getDayOfWeek(weather.datetime).toUpperCase()}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div></div>))
}

