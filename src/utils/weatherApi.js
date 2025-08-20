import { APIkey, latitude, longitude } from "../utils/constants";
import { checkRes } from "./api";

function requestWeatherInfo() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(checkRes)
    .then((data) => {
      if (data.main.temp >= 79) {
        return {
          temp: Math.round(data.main.temp),
          tempC: Math.round(((data.main.temp - 32) * 5) / 9),
          weather: "hot",
          location: data.name,
          condition: data.weather[0].description,
        };
      } else if (data.main.temp >= 75) {
        return {
          temp: Math.round(data.main.temp),
          tempC: Math.round(((data.main.temp - 32) * 5) / 9),
          weather: "warm",
          location: data.name,
          condition: data.weather[0].description,
        };
      } else {
        return {
          temp: data.main.temp,
          tempC: Math.round(((data.main.temp - 32) * 5) / 9),
          weather: "cold",
          location: data.name,
          condition: data.weather[0].description,
        };
      }
    });
}

export { requestWeatherInfo };
