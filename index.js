const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true';

fetch(apiUrl)
  .then(response => response.json())  
  .then(data => {
    console.log(data);  
    const weather = data.current_weather;
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Weather condition: ${weather.weathercode}`);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });