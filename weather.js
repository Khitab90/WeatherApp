class Weather {
    constructor(city) {
        this.apiKey = '30691886519274a280490c5f047e20b3';
        this.city   = city;
    }

    // Fetch weather from API
    async getWeather() {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);
        const responseData = await response.json();
        
        return responseData;
    }

    // Get Weekly forecast
    async getForecast(lon, lat) {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${this.apiKey}`);
        const responseForecast = await response.json();

        return responseForecast.daily;
    }

    // Change weather location
    changeLocation(city)
    {
        this.city = city;
    }


    
}