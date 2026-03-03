import "./WeatherCard.css";

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <h3>{weather.temp}°C</h3>
      <p>Wind: {weather.wind} km/h</p>
      <p>Weather Code: {weather.code}</p>
    </div>
  );
}

export default WeatherCard;