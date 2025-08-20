import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { requestWeatherInfo } from "../../utils/weatherApi";
import { ItemModal } from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Profile } from "../Profile/Profile";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import {
  requestApiItems,
  deleteApiItem,
  addApiItem,
  getUserData,
  updateUserData,
} from "../../utils/api";
import { login, register, checkToken } from "../../utils/auth";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useModal } from "../../contexts/modalContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [tempC, setTempC] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [seeModal, setSeeModal] = useState(false);
  const [seePreview, setSeePreview] = useState(false);
  const [seeDelete, setSeeDelete] = useState(false);
  const [seeLoginModal, setSeeLoginModal] = useState(false);
  const [seeRegisterModal, setSeeRegisterModal] = useState(false);
  const [selected, setSelected] = useState("hot");
  const [cards, setCards] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [seeEditProfileModal, setSeeEditProfileModal] = useState(false);

  const routerLocation = useLocation();
  const options = ["hot", "warm", "cold"];
  const { selectedItem } = useModal();
  const { id } = selectedItem;

  const onClose = () => {
    setSeeModal(false);
    setSeePreview(false);
    setSeeLoginModal(false);
    setSeeRegisterModal(false);
    setSeeEditProfileModal(false);
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

  const handleLoginSubmit = (credentials) => {
    login(credentials)
      .then(() => {
        setIsLoggedIn(true);
        setSeeLoginModal(false);
        const token = localStorage.getItem("jwt");
        if (token) {
          getUserData(token)
            .then((userData) => {
              console.log("User data fetched after login:", userData);
              setCurrentUser(userData.data);
              const redirectPath = routerLocation.state?.from?.pathname || "/";
              requestApiItems()
                .then((data) => {
                  setItems(data.data);
                  navigate(redirectPath);
                })
                .catch((err) => {
                  console.error("Failed to fetch user data after login:", err);
                });
            })
            .catch((err) => {
              console.error("Failed to fetch user data after login:", err);
            });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleRegisterSubmit = (userData) => {
    register(userData)
      .then((data) => {
        console.log("Registration successful:", data);
        setIsLoggedIn(true);
        setSeeRegisterModal(false);
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const openRegisterModal = () => {
    setSeeRegisterModal(true);
  };

  const openLoginModal = () => {
    setSeeLoginModal(true);
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

  const handleEditProfileSubmit = (data) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      updateUserData(token, data)
        .then((res) => {
          setCurrentUser(res.data);
          setSeeEditProfileModal(false);
        })
        .catch((err) => handleError(err));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
          console.error("Token invalid or expired:", err);
        });
    }

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
        setItems(data.data);
      })
      .catch((err) => handleError(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider
          value={{ handleToggleSwitchChange, currentTemperatureUnit }}
        >
          <>
            <Header
              location={location}
              setSeeModal={setSeeModal}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
            />
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
                    // onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      items={items}
                      setSeePreview={setSeePreview}
                      setSeeModal={setSeeModal}
                      setSeeEditProfileModal={setSeeEditProfileModal}
                    />
                  </ProtectedRoute>
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

            <ItemModal
              closeModal={onClose}
              seePreview={seePreview}
              openDeleteModal={() => setSeeDelete(true)}
              closeDeleteModal={() => setSeeDelete(false)}
            />

            <DeleteModal
              closeDeleteModal={() => setSeeDelete(false)}
              seeDelete={seeDelete}
              deleteHandler={handleDeleteSubmit}
            />

            <LoginModal
              closeModal={onClose}
              seeModal={seeLoginModal}
              handleLoginSubmit={handleLoginSubmit}
              openRegisterModal={openRegisterModal}
            />

            <RegisterModal
              closeModal={onClose}
              seeModal={seeRegisterModal}
              handleRegisterSubmit={handleRegisterSubmit}
              openLoginModal={openLoginModal}
            />

            <EditProfileModal
              closeModal={onClose}
              seeModal={seeEditProfileModal}
              handleEditProfileSubmit={handleEditProfileSubmit}
            />
          </>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
