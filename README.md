A weather API CTD

# Weather App

This project is a simple weather app that uses the Open-Meteo API to fetch and display current weather conditions for a given location. It converts the temperature from Celsius to Fahrenheit and provides descriptions of weather conditions based on the weather codes returned by the API.

## Features

- Fetches weather data based on the user's current location using the browser's Geolocation API.
- Allows the user to search for any city to retrieve weather data.
- Displays:
  - Temperature in Fahrenheit (°F).
  - A human-readable weather condition (e.g., "Clear sky", "Moderate rain").
- Uses OpenStreetMap’s Nominatim API for geocoding (i.e., converting city names into latitude and longitude).

## Technologies Used

- HTML: Structure of the webpage.
- CSS: Styling the webpage.
- JavaScript: Fetching data from the Open-Meteo API and updating the DOM with weather information.
- Open-Meteo API: For weather data.
- OpenStreetMap Nominatim API: For city name to coordinates conversion.

## Getting Started

### Prerequisites

To run this project locally, you need:

- A modern web browser.
- Internet access to fetch weather data from the Open-Meteo API and geocode city names via OpenStreetMap.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Samelo01/Final-API-Project.git
   ```
