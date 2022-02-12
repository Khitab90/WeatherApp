class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.highlow = document.getElementById('w-highlow');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.sunrise = document.getElementById('w-sunrise');
        this.sunset = document.getElementById('w-sunset');
        this.pressure = document.getElementById('w-pressure');  
        this.wind = document.getElementById('w-wind');
    }
    
    paint(weather) {
        this.location.textContent = weather.name;
        this.desc.textContent = weather.weather[0].main;
        this.string.textContent = `${Math.round((((weather.main.temp)-273.5)*1.8)+32)}\xB0F`;
        this.icon.setAttribute('src', "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
        this.highlow.textContent = `${Math.round((((weather.main.temp_max)-273.5)*1.8)+32)}\xB0F/${Math.round((((weather.main.temp_min)-273.5)*1.8)+32)}\xB0F`;
        this.pressure.textContent = `Pressure: ${weather.main.pressure} hPa`;
        this.sunrise.textContent = `Sunrise: ${(new Date((weather.sys.sunrise)*1000).toLocaleTimeString("en-US", {timeZone: "America/New_York", timeStyle: 'short'}))}`;
        this.sunset.textContent = `Sunset: ${new Date((weather.sys.sunset)*1000).toLocaleTimeString("en-US", {timeZone: "America/New_York", timeStyle: 'short'})}`;
        this.wind.textContent = `Wind: ${Math.round((weather.wind.speed) * 2.237)} mph `;
    }

    
}
