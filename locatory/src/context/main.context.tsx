import React, { 
  createContext, ReactNode, 
  useState, useContext, useEffect 
} from "react";
import {Alert} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

import { API_URL } from "../utils/constants";

interface MainContextInterface {
  lang: number;
  city: string;
  location: string;
  isConnected: boolean|null;
  setLang?: (val: number) => void;
  setCity?: (val: string) => void;
  setLocation?: (val: string) => void;
}

const defaultState: MainContextInterface = {
  lang: 0,
  city: "",
  location: "",
  isConnected: true
};

export const MainContext = createContext<MainContextInterface>(defaultState);

export const useMainContext = () => useContext(MainContext);

let agreed = false;

const alertCall = () => {
  if (agreed) return;
  Alert.alert(
    "Permission denied", 
    "Permission to access location was denied. Your location helps us tailor places for you. Permit location access via the app's settings", 
    []
  );
};

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<number>(defaultState.lang);
  const [city, setCity] = useState<string>(defaultState.city);
  const [location, setLocation] = useState<string>(defaultState.location);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alertCall();
        return;
      } else {
        agreed = true;
      }
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
      }, (location: Location.LocationObject) => {
        const {latitude, longitude} = location.coords;
        setLocation(`${latitude},${longitude}`);
      });
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (location.length < 1) return;
    axios
      .post(`${API_URL}api/google-api/get-city-by-coords`, {latlng: location})
      .then(({data}) => setCity(data))
      .catch(console.log);
  }, [location]);

  return (
    <MainContext.Provider
      value={{
        lang,
        setLang,
        city,
        setCity,
        location,
        setLocation,
        isConnected: true,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
