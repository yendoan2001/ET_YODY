import './App.css';
import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import OtherCitiesWeather from './components/OtherCitiesWeather';
import { Card, Col, Row, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

function App() {

  const [viewLocal, setView] = useState(true);

  return (
    <div className="App">
      <Row>
        <Col span={12} offset={6} style={{display: "flex", justifyContent: "center"}}>
          <Card
            style={{ width: 400, height: "100vh" }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span onClick={() => setView(!viewLocal)}>
                  {viewLocal ? "Cities" : "Local"}
                </span>
                <b>Weather App</b>
                <EllipsisOutlined />
              </div>
            }
          >
            {
              viewLocal ?
                <CurrentWeather />
                : <OtherCitiesWeather />
            }
          </Card>


        </Col>
      </Row>
    </div>
  );
}

export default App;
