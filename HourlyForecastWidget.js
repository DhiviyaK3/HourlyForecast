import React, { useEffect, useState } from 'react';

function HourlyForecastWidget() {
    const [hourlyForecast, setHourlyForecast] = useState([]);

    useEffect(() => {
        const fetchHourlyForecast = async () => {
            try {
                const API_KEY = 'e3c180e2c32b5c0a6202b0585947d578'; 
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=${API_KEY}`);
                const data = await response.json();
                setHourlyForecast(data.list);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHourlyForecast();
    }, []);

    return (
        <div className="forecast-widget" style={styles.forecastWidget}>
            <h2 style={styles.heading}>Hourly Forecast</h2>
            <div className="hourly-forecast" style={styles.hourlyForecast}>
                {hourlyForecast.slice(0, 5).map(hour => ( 
                    <div key={hour.dt} className="hourly-item" style={styles.hourlyItem}>
                        <p style={styles.time}>{new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                        <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} style={styles.icon} />
                        <p style={styles.temperature}>{(hour.main.temp - 273.15).toFixed(1)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    forecastWidget: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: 'grey',
        borderRadius: '10px',
        width: '370px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '15px',
        textAlign: 'center',
    },
    hourlyForecast: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hourlyItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginRight:'800px',
    },
    time: {
        marginRight: '100px',
        fontWeight: 'bold',
        
    },
    icon: {
        width: '50px',
        height: '50px',
        marginRight: '100px',
        
    },
    temperature: {
        fontWeight: 'bold',
    },
};

export default HourlyForecastWidget;
