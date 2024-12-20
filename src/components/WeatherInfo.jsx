import React from "react";
import "./WeatherInfo.css";
import { useWeather } from "../context/WeatherContext";

const WeatherInfo = () => {
  const {
    city,
    setCity,
    weatherData,
    getWeatherData,
    isLoading,
    setWeatherData,
  } = useWeather();

  const onClickHandle = () => {
    if (city) {
      getWeatherData(city);
      setCity("");
    } else {
      alert("Enter city name");
      document.querySelector(".cityNameInput").focus();
    }
  };

  const onResetHandle = () => {
    setWeatherData({});
    document.querySelector(".cityNameInput").focus();
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <span
          className="text-center spinner-border text-secondary"
          role="status"
        ></span>
      </div>
    );
  }

  return (
    <>
      {weatherData && !isLoading ? (
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className=" col-md-10 d-flex justify-content-center">
              <div className="weather-info-container">
                <h3>Weather Information</h3>

                {Array.isArray(weatherData?.weather) ? (
                  <img
                    className=" img-fluid"
                    src={`https://openweathermap.org/img/wn/${
                      Array.isArray(weatherData?.weather) &&
                      weatherData?.weather[0]?.icon
                        ? weatherData?.weather[0]?.icon
                        : ""
                    }@2x.png`}
                    alt="weather-icon"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                    }}
                  />
                ) : (
                  ""
                )}

                <div className="getdata-container d-flex justify-content-center gap-3">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="cityNameInput"
                    type="text"
                    placeholder="Enter city name"
                  />
                  <button onClick={onClickHandle} className="get-weather-btn">
                    Get weather
                  </button>
                </div>

                <div className="d-flex gap-3 mt-3">
                  <button onClick={onResetHandle} className="reset-weather-btn">
                    Reset
                  </button>
                </div>

                <h3 className=" mt-3">Location : {weatherData.name}</h3>

                <div className="div">
                  <p>Temperature : {weatherData?.main?.temp}</p>
                  <p>Humidity : {weatherData?.main?.humidity}</p>
                  <p>Wind speed : {weatherData?.wind?.speed}</p>

                  <p>
                    {Array.isArray(weatherData?.weather) &&
                    weatherData?.weather[0]?.description
                      ? weatherData?.weather[0]?.description
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Data not available</div>
      )}
    </>
  );
};

export default WeatherInfo;
