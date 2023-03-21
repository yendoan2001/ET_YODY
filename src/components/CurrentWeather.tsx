import { useEffect, useState } from 'react';
import { Card } from 'antd';
import axios from "axios";
import { CurrentWeatherInterface } from "../interface";
import { Col, Row } from 'antd';
import WeatherForecast from './WeatherForecast';


const CurrentWeather = () => {

    const city: string = "Hanoi";

    const kevin: number = 273.15;

    let initialState: CurrentWeatherInterface = {
        temp: 0,
        description: 'sunny',
        name: 'Hanoi',
        temp_min: 0,
        temp_max: 0
    }
    const [currentWeather, setCurrentWeather] = useState(initialState);
    const [currentForecast, setCurrentForecast] = useState({});
    const [todayForecast, setTodayForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b39d4249c5904178cae94bf0d40d71cf`)
            .then(res => {
                let data: CurrentWeatherInterface = {
                    temp: res.data.main.temp - kevin,
                    description: res.data.weather[0].description,
                    name: res.data.name,
                    temp_min: res.data.main.temp_min - kevin,
                    temp_max: res.data.main.temp_max - kevin
                }
                setCurrentWeather(data);
                setCurrentForecast(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b39d4249c5904178cae94bf0d40d71cf&units=metric`)
            .then(res => {
                setLoading(false);
                setTodayForecast(res.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: 0, fontSize: 25 }}>
                    {currentWeather.name}
                </p>
                <h1 style={{ fontSize: 75, margin: 0, lineHeight: 1, paddingLeft: "0.3em" }}>
                    {currentWeather.temp}°
                </h1>
                <p style={{ margin: "5px" }}>
                    {currentWeather.description}
                </p>
                <p style={{ margin: "5px" }}>
                    H: {currentWeather.temp_max}°  L: {currentWeather.temp_min}°
                </p>
            </div>
            <Card size="small" title="Partly cloud conditions expected around 16:00" style={{ width: 360 }}>
                {
                    loading ?
                        <p>Loading...</p>
                        : <WeatherForecast forecastData={todayForecast} weatherData={currentForecast} />
                }
            </Card>
            <Card size="small" title="10-days forecast" style={{ width: 360, marginTop: 10 }}>
                <Row>
                    <Col sm={4}>
                        Today
                    </Col>
                    <Col sm={10}>
                        Icon
                    </Col>
                    <Col>
                        18 - 25 C
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        Today
                    </Col>
                    <Col sm={10}>
                        Icon
                    </Col>
                    <Col>
                        18 - 25 C
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        Today
                    </Col>
                    <Col sm={10}>
                        Icon
                    </Col>
                    <Col>
                        18 - 25 C
                    </Col>
                </Row>
            </Card>
        </>
    )
}


export default CurrentWeather;