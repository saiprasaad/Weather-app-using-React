export class WeatherDetailByDay {
    constructor(datetime, temp, tempmin, tempmax, humidity, precip, uvindex, icon, conditions) {
        this.datetime = datetime;
        this.temp = temp;
        this.tempmin = tempmin;
        this.tempmax = tempmax;
        this.humidity = humidity;
        this.precip = precip;
        this.uvindex = uvindex;
        this.icon = icon;
        this.conditions = conditions;
    }
}