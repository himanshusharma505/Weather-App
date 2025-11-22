const API_KEY = "YOUR_API_KEY";
const weatherBox = document.getElementById("weather-info");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Fetch weather by city
async function fetchWeather(city) {
    weatherBox.innerHTML = "<p>Loading...</p>";

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();

        if (data.cod === "404") {
            weatherBox.innerHTML = "<p>City not found</p>";
            return;
        }

        displayWeather(data);

    } catch (error) {
        weatherBox.innerHTML = "<p>Error loading weather</p>";
    }
}

// Show result card
function displayWeather(data) {
    weatherBox.innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
}

// Search button
searchBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();
    if (city !== "") fetchWeather(city);
});

// Auto detect location
function autoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;

            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
            let res = await fetch(url);
            let data = await res.json();
            displayWeather(data);
        });
    } else {
        weatherBox.innerHTML = "<p>Geolocation not supported</p>";
    }
}

autoLocation();
