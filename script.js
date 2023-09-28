document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const getGeolocationBtn = document.getElementById("getGeolocationBtn");
    const unitToggle = document.getElementById("unitToggle");
    const weatherInfo = document.querySelector(".weather-info");
    const locationName = document.querySelector(".location-name");
    const unitLabel = document.querySelector(".unit-label");

    // Function to fetch weather data using geolocation
    function getWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const unit = unitToggle.value;

                const apiKey = "540cb8f6176ab24da67f2f515afd9fa3"; // Replace with your actual API key
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

                fetch(apiUrl)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Weather data not available");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        const { name, main, wind, weather } = data;
                        const temperature = main.temp;
                        const humidity = main.humidity;
                        const windSpeed = wind.speed;
                        const weatherDescription = weather[0].description;

                        locationName.textContent = `Weather in ${name}`;

                        weatherInfo.innerHTML = `
                            <h2 class="location-name">${locationName.textContent}</h2>
                            <p class="weather-description">Weather Description: ${weatherDescription}</p>
                            <p class="temperature">Temperature: ${temperature}°${unit === "metric" ? "C" : "F"}</p>
                            <p class="humidity">Humidity: ${humidity}%</p>
                            <p class="wind-speed">Wind Speed: ${windSpeed} m/s</p>
                        `;

                        unitLabel.textContent = unit === "metric" ? "Celsius" : "Fahrenheit";
                    })
                    .catch((error) => {
                        // Handle different error scenarios
                        if (error.message.includes("NetworkError")) {
                            weatherInfo.textContent = "Server is not responding. Please try again later.";
                        } else {
                            weatherInfo.textContent = error.message;
                        }
                    });
            });
        } else {
            weatherInfo.textContent = "Geolocation is not supported by your browser.";
        }
    }

    function handleGeolocationClick() {
        getWeatherByGeolocation();
    }

    getGeolocationBtn.addEventListener("click", handleGeolocationClick);

    getWeatherBtn.addEventListener("click", () => {
        const location = locationInput.value;
        const unit = unitToggle.value;

        if (location) {
            const apiKey = "540cb8f6176ab24da67f2f515afd9fa3"; // Replace with your actual API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Location not found");
                    }
                    return response.json();
                })
                .then((data) => {
                    const { name, main, wind, weather } = data;
                    const temperature = main.temp;
                    const humidity = main.humidity;
                    const windSpeed = wind.speed;
                    const weatherDescription = weather[0].description;

                    locationName.textContent = `Weather in ${name}`;

                    weatherInfo.innerHTML = `
                        <h2 class="location-name">${locationName.textContent}</h2>
                        <p class="weather-description">Weather Description: ${weatherDescription}</p>
                        <p class="temperature">Temperature: ${temperature}°${unit === "metric" ? "C" : "F"}</p>
                        <p class="humidity">Humidity: ${humidity}%</p>
                        <p class="wind-speed">Wind Speed: ${windSpeed} m/s</p>
                    `;

                    unitLabel.textContent = unit === "metric" ? "Celsius" : "Fahrenheit";
                })
                .catch((error) => {
                    // Handle different error scenarios
                    if (error.message.includes("NetworkError")) {
                        weatherInfo.textContent = "Server is not responding. Please try again later.";
                    } else {
                        weatherInfo.textContent = error.message;
                    }
                });
        } else {
            getWeatherByGeolocation();
        }
    });
});
