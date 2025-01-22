import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString('tr-TR', options));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '6d30af576b130ae10b25618e024fc6a1';
      const city = 'Istanbul';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      const currentWeatherResponse = await axios.get(currentWeatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      setWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data.list.slice(0, 5));
    };

    fetchWeather();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel} id={styles.panel1}>
        <div className={styles.centeredContent}>
          <h1 className={styles.heading1}>{time}</h1>
          <h2 className={styles.heading2}>{date}</h2>
        </div>
      </div>
      <div className={styles.panel} id={styles.panel2}>
        <div className={styles.centeredContent}>
          <h1 className={styles.heading1}>Anlık Hava Durumu</h1>
          {weather && (
            <h2 className={styles.heading2}>{weather.main.temp}°C, {weather.weather[0].description}</h2>
          )}
        </div>
      </div>
      <div className={styles.panel} id={styles.panel3}>
        <div className={styles.centeredContent}>
          <h1 className={styles.heading1}>5 Günlük Hava Tahmini</h1>
          <div className={styles.forecast}>
            {forecast.map((day, index) => (
              <div key={index} className={styles.forecastItem}>
                <h2 className={styles.heading2}>{new Date(day.dt_txt).toLocaleDateString('tr-TR')}</h2>
                <h3 className={styles.heading3}>{day.main.temp}°C</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
