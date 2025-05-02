import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import { requestWeatherInfo } from "../../utils/weatherApi";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();

  useEffect(() => {
    requestWeatherInfo().then((data) => {
      setWeather(data.weather);
      setTemp(data.temp);
      setLocation(data.location);
    });
  }, []);

  return (
    <>
      <Header location={location} />
      <Main temp={temp} weather={weather} />
    </>
  );
}

export default App;
