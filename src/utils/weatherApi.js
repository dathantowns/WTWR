import { APIkey, latitude, longitude } from "../utils/constants";

function requestWeatherInfo() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      if (data.main.temp >= 86) {
        return {
          temp: data.main.temp,
          weather: "hot",
          location: data.name,
          condition: data.weather[0].description,
        };
      } else if (data.main.temp >= 66) {
        return {
          temp: data.main.temp,
          weather: "warm",
          location: data.name,
          condition: data.weather[0].description,
        };
      } else {
        return {
          temp: data.main.temp,
          weather: "cold",
          location: data.name,
          condition: data.weather[0].description,
        };
      }
    });
}

export { requestWeatherInfo };
