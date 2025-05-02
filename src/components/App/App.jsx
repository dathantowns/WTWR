import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import { requestWeatherInfo } from "../../utils/weatherApi";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [isSunny, setIsSunny] = useState(true);
  const [condition, setCondition] = useState();

  useEffect(() => {
    requestWeatherInfo().then((data) => {
      setWeather(data.weather);
      setTemp(data.temp);
      setLocation(data.location);
      setCondition(data.condition);
      if (condition.includes("clouds")) {
        setIsSunny(false);
      }
    });
  }, []);

  return (
    <>
      <Header location={location} />
      <Main temp={temp} weather={weather} isSunny={isSunny} />
    </>
  );
}

export default App;
