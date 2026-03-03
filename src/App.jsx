import { useState } from "react";
import WeatherCard from "./component/weathercard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    // 1. Get coordinates from city
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
    );
    const geoData = await geoRes.json();

    if (geoData.length === 0) {
      alert("City not found!");
      return;
    }

    const { lat, lon } = geoData[0];

    // 2. Get weather from Open-Meteo
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    setWeather({
      city: geoData[0].display_name,
      temp: weatherData.current_weather.temperature,
      wind: weatherData.current_weather.windspeed,
      code: weatherData.current_weather.weathercode,
    });
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;