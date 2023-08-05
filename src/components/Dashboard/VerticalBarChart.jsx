import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const VerticalBarChart = () => {
  const [tempdata, setTempData] = useState([]);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }

      const unsubscribeSnapshot = onSnapshot(
        query(collection(db, `/temperatures`), orderBy("myTimestamp", "asc")),
        (snapshot) => {
          setTempData(
            snapshot.docs.map((doc) => ({
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
     
      const barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: tempdata.map((_, i) => i + 2 + "h"),
          datasets: [
            {
              label: "Temperature Data",
              data: tempdata.map((data) => data.temperature),
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.5) ",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart",
            },
          },
        },
      });

      return () => {
        barChart.destroy();
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

export default VerticalBarChart;
