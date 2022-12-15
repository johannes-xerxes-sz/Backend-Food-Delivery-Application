const request = require('request'); 
const API_KEY = (WEATHER_API_KEY);

const forecast = function (latitude, longitude) { 
  
    const url = `http://api.openweathermap.org/data/2.5/weather?`
            +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  
    request({ url: url, json: true }, function (error, response) { 
        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        } 
          else { 
            const temp = response.body.main.temp -  273.15
            console.log('It is currently '
                + Math.floor(temp)
                + ' degrees out.'
            ); 
            const tempMax = response.body.main.temp_max -  273.15
            const tempMin = response.body.main.temp_min -  273.15

            console.log('The high today is '
                + Math.floor(tempMax)
                + ' with a low of '
                + Math.floor(tempMin)
            ); 
  
            console.log('Humidity today is '
                + response.body.main.humidity
            ); 
            console.log('weather is '
            + response.body.weather[0].main
            ); 
        } 
    }) 
} 
  
var latitude = 8.4822; // Indore latitude 
var longitude = 124.6472; // Indore longitude 
  
// Function call 
forecast(latitude, longitude); 