// Base Open-Meteo API URL
const apiUrl = 'https://api.open-meteo.com/v1/forecast?current_weather=true';

// Weather code descriptions
const weatherCodeDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// Function to fetch weather data based on latitude and longitude
async function getWeather(lat, lon, locationName = 'Your Location') {
  const url = `${apiUrl}&latitude=${lat}&longitude=${lon}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract current weather data
    const weather = data.current_weather;
    const temperatureCelsius = weather.temperature;
    const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius); // Convert to Fahrenheit
    const weatherCode = weather.weathercode;

    // Get weather description based on the weather code
    const weatherDescription = weatherCodeDescriptions[weatherCode] || "Unknown weather condition";

    // Update the UI with weather data
    updateWeatherUI(temperatureFahrenheit, weatherDescription, locationName);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Unable to retrieve weather data.');
  }
}

// Function to update the UI with the weather information
function updateWeatherUI(temperature, weatherDescription, locationName) {
  document.getElementById('location-name').innerText = locationName;
  document.getElementById('current-temperature').innerText = `${temperature.toFixed(1)} °F`;
  document.getElementById('current-condition').innerText = weatherDescription;
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
