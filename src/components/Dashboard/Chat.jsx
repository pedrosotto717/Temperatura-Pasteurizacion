import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const Chat = (props) => {
  const { urlDatabase = "/temperatures" } = props;
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setTemperature(0);
      }

      listenForTemperature(user.uid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const listenForTemperature = (userId) => {
    const temperatureQuery = query(
      collection(db, urlDatabase),
      orderBy("timestamp", "desc"),
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
    <p className="text">
      <strong>Current temperature: {temperature}°C</strong>
    </p>
  );
};

export default Chat;
