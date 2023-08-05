import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const TemperatureChart = (props) => {
  const {
    urlDatabase = "/temperatures",
    bg = "rgba(75, 192, 192, 0.2)",
    border = "rgba(75, 192, 192, 1)",
  } = props;
  
  const [tempdata, setTempData] = useState([]);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }

      const unsubscribeSnapshot = onSnapshot(
        query(collection(db, urlDatabase), orderBy("timestamp", "asc")),
        (snapshot) => {
          setTempData(
            snapshot.docs.slice(0, 15).map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: tempdata.map(() => new Date()), // Empty labels array
          datasets: [
            {
              label: "Temperature",
              data: tempdata.map((data) => data.value),
              borderColor: border,
              backgroundColor: bg,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: false, // Hide the x-axis ticks
              },
            },
          },
        },
      });

      return () => {
        lineChart.destroy();
      };
    }
  }, [tempdata]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="" style={{}}>
          <canvas ref={chartRef} style={{ width: "1000px", height: "300px" }} />
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;
