import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { requestWeatherInfo } from "../../utils/weatherApi";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { FcProvider } from "../../contexts/FcContext";
import { Profile } from "../Profile/Profile";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { requestApiItems } from "../../utils/api";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [tempC, setTempC] = useState();
  const [seeModal, setSeeModal] = useState(false);
  const [seePreview, setSeePreview] = useState(false);
  const [seeDelete, setSeeDelete] = useState(false);
  const [selected, setSelected] = useState("Hot");
  const [cardData, setCardData] = useState([]);
  const [cards, setCards] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const options = ["Hot", "Warm", "Cold"];

  const onClose = () => {
    setSeeModal(false);
    setSeePreview(false);
    setSeeDelete(false);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log("Selected:", selected);
  };

  useEffect(() => {
    requestWeatherInfo()
      .then((data) => {
        setWeather(data.weather);
        setTemp(data.temp);
        setTempC(data.tempC);
        setLocation(data.location);
      })
      .catch((err) => console.log(err));

    requestApiItems().then((items) => setItems([...items]));
  }, []);

  return (
    <>
      <FcProvider>
        <Header location={location} setSeeModal={setSeeModal} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                temp={temp}
                tempC={tempC}
                weather={weather}
                setSeePreview={setSeePreview}
                setItems={setItems}
                items={items}
                setSelectedItem={setSelectedItem}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </FcProvider>
      <Footer />
      <ModalWithForm
        closeModal={onClose}
        seeModal={seeModal}
        selected={selected}
        title="Add garment"
        name="modal__form"
        buttonText="Add garment"
        weather={weather}
        setCardData={setCardData}
        setSelected={setSelected}
        setSeePreview={setSeePreview}
        setCards={setCards}
        cards={cards}
      >
        <label htmlFor="name-input" className="modal__label">
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
          <li className="temp-options">
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
                  onChange={handleChange}
                />
                {opt}
              </label>
            ))}
          </li>
        </ul>
      </ModalWithForm>
      <ItemModal
        closeModal={onClose}
        selectedItem={selectedItem}
        seePreview={seePreview}
        weather={weather}
        openDeleteModal={() => setSeeDelete(true)}
        closeDeleteModal={() => setSeeDelete(false)}
      />
      <DeleteModal
        closeDeleteModal={() => setSeeDelete(false)}
        closeModal={onClose}
        seeDelete={seeDelete}
      />
    </>
  );
}

export default App;
