import { useState } from "react";

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      setWeather(null);
      setError("Error fetching data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Weather App</h1>

      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl mb-2">Temperature: {weather.main.temp}°C</p>
          <p className="capitalize mb-2">Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
