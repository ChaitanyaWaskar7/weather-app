document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "76814a391ccd413504c302b672a33c9d";
  getWeatherButton.addEventListener("click", async () => {
    const cityname = cityInput.value.trim();
    if (!cityname) return;
    // it may throw error
    // it will takes some time

    try {
      const weatherData = await fetchWeatherData(cityname);
      DisplayWeatherData(weatherData);
    } catch (error) {
      showsError();
      console.log(error);
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found :(");
    }

    const data = await response.json();
    return data;
  }

  function DisplayWeatherData(data) {
    const { name, main, weather } = data;

    // unlock display

    cityNameDisplay.textContent = name;
    temperature.textContent = `Temperature  : ${main.temp}`;
    description.textContent = `Weather is : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showsError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
