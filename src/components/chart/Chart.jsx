import React, { useState } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import "./Chart.css";

function Chart() {
  const [temporalidad, setTemporalidad] = useState("1h");

  // Función para cambiar la temporalidad
  const cambiarTemporalidad = (nuevaTemporalidad) => {
    setTemporalidad(nuevaTemporalidad);
  };

  // Función para obtener las etiquetas del eje x según la temporalidad
  const obtenerEtiquetasEjeX = () => {
    switch (temporalidad) {
      case "1h":
        return ["00:00", "01:00", "02:00", "03:00", "04:00"];
      case "1d":
        return ["22-04", "23-04", "24-04", "25-04", "26-04"];
      case "1w":
        return ["22-03", "29-03", "06-04", "13-04", "20-04", "27-04", "04-05"];
      case "1m":
        return ["March", "April", "May", "June", "July"];
      default:
        return [];
    }
  };

  // Función para obtener los precios del eje y según la temporalidad
  const obtenerPreciosEjeY = () => {
    switch (temporalidad) {
      case "1h":
        return [4100, 4200, 4300, 4400, 4500];
      case "1d":
        return [4300, 4400, 4500, 4600, 4700];
      case "1w":
        return [4500, 4600, 4700, 4800, 4900];
      case "1m":
        return [4600, 4700, 4800, 4900, 5000];
      default:
        return [];
    }
  };

  return (
    <div className="chart-d-container">
      <div className="temporal-buttons">
        <button
          className="temporal-button"
          onClick={() => cambiarTemporalidad("1h")}
        >
          1h
        </button>
        <button
          className="temporal-button"
          onClick={() => cambiarTemporalidad("1d")}
        >
          1d
        </button>
        <button
          className="temporal-button"
          onClick={() => cambiarTemporalidad("1w")}
        >
          1w
        </button>
        <button
          className="temporal-button"
          onClick={() => cambiarTemporalidad("1m")}
        >
          1m
        </button>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        width={1333}
        height={774}
        style={{
          background: { fill: "#f5f5f5" },
        }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#E0AA3E" },
            parent: { border: "5px solid black" },
          }}
          data={[
            { x: 1, y: 4123 },
            { x: 2, y: 4331 },
            { x: 3, y: 4221 },
            { x: 4, y: 4561 },
            { x: 5, y: 4700 },
          ]}
          interpolation="natural" // Tipo de interpolación para la línea
          labelComponent={<VictoryTooltip />} // Componente de tooltip para mostrar los valores
        />
        {/* Definir ejes */}
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]} // Valores en el eje x
          tickFormat={obtenerEtiquetasEjeX()} // Etiquetas en el eje x según la temporalidad
        />
        <VictoryAxis
          dependentAxis
          orientation="right"
          tickValues={obtenerPreciosEjeY()}
        />
      </VictoryChart>
    </div>
  );
}

export default Chart;
