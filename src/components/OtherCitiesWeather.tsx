import { Card, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { CurrentWeatherInterface } from "../interface";
import { useEffect, useState } from "react";

const WeatherCard = ({ name, description, temp, temp_min, temp_max }: CurrentWeatherInterface) => {

    return (
        <Card style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ textAlign: "left" }}>
                    <h2 style={{ margin: 0 }}>{name}</h2>
                    <span style={{ margin: 0 }}>Time</span>
                </div>
                <div style={{ margin: 0 }}>
                    <h1 style={{ margin: 0, fontSize: 50, lineHeight: 1 }}>{temp}°</h1>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <span>{description}</span>
                </div>
                <div>
                    <span>H: {temp_max}°  L: {temp_min}°</span>
                </div>
            </div>
        </Card>
    )
}

export const OtherCitiesWeather = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&appid=b39d4249c5904178cae94bf0d40d71cf')
            .then(res => {
                setData(res.data.list)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ marginBottom: 10 }}>
                <Input placeholder='Search for city or airport' prefix={<SearchOutlined />} />
            </div>
            {
                data.map((item: any, index) => {
                    let cityData = {
                        name: item.name,
                        description: item.weather[0].description,
                        temp: Number((item.main.temp - 273).toFixed(2)),
                        temp_min: Number((item.main.temp_min - 273).toFixed(2)),
                        temp_max: Number((item.main.temp_max - 273).toFixed(2))
                    }
                    return <WeatherCard key={index} {...cityData} />
                })
            }
        </div>
    )

}

export default OtherCitiesWeather;