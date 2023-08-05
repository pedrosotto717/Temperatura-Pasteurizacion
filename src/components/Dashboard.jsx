import React from "react";
import Chat from "./Dashboard/Chat";
import Navbar from "./NavBar/Navbar";
import Thermometer from "./Dashboard/Thermometer";
import TemperatureChart from "./Dashboard/TemperatureChart";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          <h2 className="mt-5">Temperatura de Pasteurizacion</h2>
          <div className="col-md-6 border-right">
            <div
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                paddingBottom: "20px",
                paddingTop: "40px",
              }}
            >
              <Thermometer  maxTemperature="100"/>
              <div className="p-2 mt-3">
                <Chat/>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                paddingBottom: "20px",
                paddingTop: "40px",
              }}
            >
              <TemperatureChart bg="rgba(200, 51, 51, 0.25)" border="rgba(200, 51, 51, 0.75)" />
            </div>
          </div>
        </div>
        
        <div className="row">
          <h2 className="mt-5">Temperatura - Cadena Fria</h2>
          <div className="col-md-6 border-right">
            <div
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                paddingBottom: "20px",
                paddingTop: "40px",
              }}
            >
              <Thermometer urlDatabase='/chill_temperatures' maxTemperature="10" /> 
              <div className="p-2 mt-3">
                <Chat urlDatabase='/chill_temperatures' />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                paddingBottom: "20px",
                paddingTop: "40px",
              }}
            >
             <TemperatureChart urlDatabase='/chill_temperatures' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
