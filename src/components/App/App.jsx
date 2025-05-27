import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { requestWeatherInfo } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
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
  const [selected, setSelected] = useState("Hot");
  const [cards, setCards] = useState([]);
  const [items, setItems] = useState([]);

  const options = ["Hot", "Warm", "Cold"];
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

  const handleDeleteSubmit = () => {
    deleteApiItem(id)
      .then(() => {
        const newArr = items.filter((obj) => obj._id !== id);
        setItems(newArr);
        setSeeDelete(false);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  const getNextId = (items) => {
    return items.length === 0 ? 1 : Math.max(...items.map((i) => i._id)) + 1;
  };

  function handleFormSubmit(e) {
    e.preventDefault();

    const newCard = {
      name: e.target[1].value,
      weather: weather,
      imageUrl: e.target[2].value,
      _id: getNextId(items),
    };
    addApiItem(newCard).then((res) => setItems([res, ...items]));
    onClose();
  }

  useEffect(() => {
    requestWeatherInfo()
      .then((data) => {
        setWeather(data.weather);
        setTemp(data.temp);
        setTempC(data.tempC);
        setLocation(data.location);
      })
      .catch((err) => console.log(err));

    requestApiItems().then((data) => setItems(data));
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
          {seeModal && (
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
          )}
          {seePreview && (
            <ItemModal
              closeModal={onClose}
              seePreview={seePreview}
              setSeePreview={setSeePreview}
              weather={weather}
              openDeleteModal={() => setSeeDelete(true)}
              closeDeleteModal={() => setSeeDelete(false)}
            />
          )}

          {seeDelete && (
            <DeleteModal
              closeDeleteModal={() => setSeeDelete(false)}
              seeDelete={seeDelete}
              deleteHandler={handleDeleteSubmit}
            />
          )}
        </>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
