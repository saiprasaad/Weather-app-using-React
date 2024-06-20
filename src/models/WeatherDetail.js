import { WeatherDetailByDay } from "./WeatherDetailByDay";

export class WeatherDetail {
    constructor(location, description) {
        this.location = location;
        this.description = description;
        this.dailyWeather = [];
    }

    addWeatherDetailByDay(datetime, temp, tempmin, tempmax, humidity, precip, uvindex, icon, conditions) {
        const weatherDetailByDay = new WeatherDetailByDay(datetime, temp, tempmin, tempmax, humidity, precip, uvindex, icon, conditions);
        this.dailyWeather.push(weatherDetailByDay);
    }
}