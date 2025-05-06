import "./App.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { requestWeatherInfo } from "../../utils/weatherApi";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [seeModal, setSeeModal] = useState(false);
  const [seePreview, setSeePreview] = useState(false);
  const [selected, setSelected] = useState("Hot");
  const options = ["Hot", "Warm", "Cold"];

  const onClose = () => {
    setSeeModal(false);
  };

  useEffect(() => {
    requestWeatherInfo().then((data) => {
      setWeather(data.weather);
      setTemp(data.temp);
      setLocation(data.location);
    });
  }, []);

  return (
    <>
      <Header location={location} setSeeModal={setSeeModal} />
      <Main temp={temp} weather={weather} />
      <Footer />
      <ModalWithForm
        closeModal={onClose}
        seeModal={seeModal}
        title="Add garment"
        name="modal__form"
        buttonText="Add garment"
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name-input"
            placeholder="Name"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="modal__input-error" id="name-error"></span>
        </label>
        <label htmlFor="image-input" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="image-input"
            placeholder="Image URL"
            required
          />
          <span className="modal__input-error" id="image-error"></span>
        </label>
        {"Select the weather type:"}
        <ul className="modal__list">
          <div className="temp-options">
            {options.map((opt) => (
              <label
                key={opt}
                className={`temp-label ${selected === opt ? "checked" : ""}`}
              >
                <input
                  type="radio"
                  name="temperature"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </ul>
      </ModalWithForm>
    </>
  );
}

export default App;
