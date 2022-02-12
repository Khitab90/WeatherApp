// Init UI
const ui = new UI();

//  Init weather object
const weather = new Weather('New York');

const ctx = document.getElementById('myChart').getContext('2d');
let hightemps = [];
let lowtemps = [];

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getForecast);
//change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    
    weather.changeLocation(city);

    //Get and display weather and Forecast
    getWeather();
    getForecast();

    //Close Modal
    $('#locModal').modal('hide');
      

} );


function getWeather() {
    let lon, lat;
    weather.getWeather()
        .then(results => {
            ui.paint(results);
             })
        .catch(err => console.log(err));
}

function getForecast(){
    let lon, lat;
    weather.getWeather()
        .then(results => {
            lon = results.coord.lon;
            lat = results.coord.lat;
            weather.getForecast(lon, lat)
                .then(results => {
                    results.forEach(result => hightemps.push(Math.round((((result.temp.max)-273.5)*1.8)+32)));
                    results.forEach(result => lowtemps.push(Math.round((((result.temp.min)-273.5)*1.8)+32)));
                    let days = [];
        
                    for(let i=0; i<7; i++){
                        days.push(new Date((results[i].dt)*1000).toLocaleDateString('en-US', {weekday: 'long'}))
                    }
                    
                    //Setup
                    const data = {
                        labels: days,
                            datasets: [{
                                label: 'High Temp',
                                data: hightemps,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)'    
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)'    
                                ],
                                borderWidth: 1,
                                fill: false
                                },  
                                {label: 'Low Temp',
                                data: lowtemps,
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)'   
                                ],
                                borderColor: [
                                    'rgba(54, 162, 235, 1)'    
                                ],
                                borderWidth: 1,
                                fill: false
                                }
                                

                            ]
                    };
                    //Config
                    const config = {
                        type: 'line',
                        data,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                    // type: 'linear',
                                    // display: true,
                                    // position: 'left',
                                },
                                plugins: {
                                    display: false,
                                    tooltip: {
                                        callbacks: {
                                            label: function(data) {
                                                console.log(data);
                                                var label = weatherData[0];
                                                var high = weatherData[1];
                                                var low = weatherData[2];
                                                var desc = weahterData[3];
                                                return label, high, low, desc;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };

                    //Init
                    let myChart = new Chart(ctx, config);
                })
                .catch(err => console.log(err));

        })
}