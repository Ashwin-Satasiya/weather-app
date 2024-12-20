import { createContext, useContext, useState } from "react";
import axios from "axios";

const weatherContext = createContext();

export const useWeather = () => {
  return useContext(weatherContext);
};

export const WeatherContextProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoadion] = useState(false);

  const getWeatherData = async (city) => {
    try {
      setIsLoadion(true);
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"6144a3853018590805fad0c74d991a43"}`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.log("get weather data", error);
    }
    setIsLoadion(false);
  };

  return (
    <weatherContext.Provider
      value={{
        city,
        setCity,
        weatherData,
        setWeatherData,
        getWeatherData,
        isLoading,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};
