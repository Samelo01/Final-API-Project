// Base Open-Meteo API URL
const apiUrl = 'https://api.open-meteo.com/v1/forecast?current_weather=true';

// Function to fetch weather data based on latitude and longitude
async function getWeather(lat, lon, locationName = 'Your Location') {
  const url = `${apiUrl}&latitude=${lat}&longitude=${lon}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract current weather data
    const weather = data.current_weather;
    const temperature = weather.temperature;
    const weatherCode = weather.weathercode;

    // Update the UI with weather data
    updateWeatherUI(temperature, weatherCode, locationName);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Unable to retrieve weather data.');
  }
}

// Function to update the UI with the weather information
function updateWeatherUI(temperature, weatherCode, locationName) {
  document.getElementById('location-name').innerText = locationName;
  document.getElementById('current-temperature').innerText = `${temperature} °C`;
  document.getElementById('current-condition').innerText = `Weather Code: ${weatherCode}`;
}

// Get user's current location using the Geolocation API
function fetchWeatherForCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    }, () => {
      alert('Unable to retrieve your location.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Fetch weather based on city input using Nominatim (OpenStreetMap) for geocoding
async function fetchWeatherForCity(cityName) {
  try {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.length > 0) {
      const lat = geocodeData[0].lat;
      const lon = geocodeData[0].lon;
      getWeather(lat, lon, cityName);
    } else {
      alert('City not found. Please try another city.');
    }
  } catch (error) {
    alert('Error fetching city coordinates.');
  }
}

// Add event listeners for buttons
document.getElementById('current-location-btn').addEventListener('click', fetchWeatherForCurrentLocation);
document.getElementById('search-btn').addEventListener('click', () => {
  const cityName = document.getElementById('city-input').value;
  if (cityName) {
    fetchWeatherForCity(cityName);
  }
});

// Fetch weather for the current location when the page loads
window.onload = fetchWeatherForCurrentLocation;
