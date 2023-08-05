import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import Thermometer from 'react-thermometer-component'

const ThermometerData = (props) => {
  const {urlDatabase = '/temperatures', maxTemperature = "40"} = props; 
  const [temperature, setTemperature] = useState(null);
  const [suggestedClothing, setSuggestedClothing] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => { //
      if (user) {
        listenForTemperature(user.uid);
      } else {
        // Handle case when user is not authenticated
        setTemperature(null);
        setSuggestedClothing('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const listenForTemperature = (userId) => {
    const temperatureQuery = query(
      collection(db, urlDatabase),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(temperatureQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        const tempData = doc.data();
        setTemperature(tempData.value);
      });
    });

    return unsubscribe;
  };

  return (
    <div style={{ textAlign: "center" }} className="d-flex">
    <Thermometer
        theme="light"
        value={temperature}
        max={maxTemperature}
        steps="5"
        format="°C"
        size="large"
        height="300"
    />
    </div>
  );
};

export default ThermometerData;
