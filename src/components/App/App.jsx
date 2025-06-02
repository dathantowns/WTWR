import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { requestWeatherInfo } from "../../utils/weatherApi";
import PreviewModal from "../PreviewModal/PreviewModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Profile } from "../Profile/Profile";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { requestApiItems, deleteApiItem, addApiItem } from "../../utils/api";
import AddItemModal from "../AddItemModal";
import { useModal } from "../../contexts/modalContext";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [tempC, setTempC] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [seeModal, setSeeModal] = useState(false);
  const [seePreview, setSeePreview] = useState(false);
  const [seeDelete, setSeeDelete] = useState(false);
  const [selected, setSelected] = useState("hot");
  const [cards, setCards] = useState([]);
  const [items, setItems] = useState([]);

  const options = ["hot", "warm", "cold"];
  const { selectedItem } = useModal();
  const [, , id = ""] = selectedItem;

  const onClose = () => {
    setSeeModal(false);
    setSeePreview(false);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleError = (err) => {
    console.log(err);
  };

  const handleDeleteSubmit = () => {
    deleteApiItem(id)
      .then(() => {
        const newArr = items.filter((obj) => obj._id !== id);
        setItems(newArr);
        setSeeDelete(false);
        onClose();
      })
      .catch((err) => handleError(err));
  };

  const getNextId = (items) => {
    return items.length === 0 ? 1 : Math.max(...items.map((i) => i._id)) + 1;
  };

  function handleFormSubmit(e) {
    e.preventDefault();

    const newCard = {
      name: e.target[1].value,
      weather: selected,
      imageUrl: e.target[2].value,
      _id: getNextId(items),
    };
    addApiItem(newCard)
      .then((res) => setItems([res, ...items]))
      .then(() => {
        onClose();
      })
      .catch((err) => handleError(err));
  }

  useEffect(() => {
    requestWeatherInfo()
      .then((data) => {
        setWeather(data.weather);
        setTemp(data.temp);
        setTempC(data.tempC);
        setLocation(data.location);
      })
      .catch((err) => handleError(err));

    requestApiItems()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => handleError(err));
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ handleToggleSwitchChange, currentTemperatureUnit }}
      >
        <>
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
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  items={items}
                  setSeePreview={setSeePreview}
                  setSeeModal={setSeeModal}
                />
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            closeModal={onClose}
            seeModal={seeModal}
            setCards={setCards}
            cards={cards}
            handleFormSubmit={handleFormSubmit}
            options={options}
            handleChange={handleChange}
            selected={selected}
          />

          <PreviewModal
            closeModal={onClose}
            seePreview={seePreview}
            selected={selected}
            openDeleteModal={() => setSeeDelete(true)}
            closeDeleteModal={() => setSeeDelete(false)}
          />

          <DeleteModal
            closeDeleteModal={() => setSeeDelete(false)}
            seeDelete={seeDelete}
            deleteHandler={handleDeleteSubmit}
          />
        </>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
