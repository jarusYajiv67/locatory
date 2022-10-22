import axios from "axios";
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

import { API_URL } from "../utils/constants";

interface UserContextInterface {
  phone: string;
  otp: string;
  loggedIn: boolean;
  expires: number;
  token: string;
  loading: boolean;
  favourites: Array<string>;
  setPhone?: (val: string) => void;
  setOtp?: (val: string) => void;
  setLoggedIn?: (val: boolean) => void;
  setExpires?: (val: number) => void;
  setToken?: (val: string) => void;
  setLoading?: (val: boolean) => void;
  setFavourites?: (val: Array<string>) => void;
  favHandler?: (val: string) => void;
  addFav?: (val: string) => void;
  remFav?: (val: string) => void;
  loginUser?: () => void;
  logoutUser?: () => void;
}

const defaultState: UserContextInterface = {
  phone: "",
  otp: "",
  loggedIn: false,
  expires: Date.now(),
  token: "",
  loading: false,
  favourites: []
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const toast = useToast();
  
  const [phone, setPhone] = useState<string>(defaultState.phone);
  const [otp, setOtp] = useState<string>(defaultState.otp);
  const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
  const [expires, setExpires] = useState<number>(defaultState.expires);
  const [token, setToken] = useState<string>(defaultState.token);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);
  const [favourites, setFavourites] = useState<Array<string>>(defaultState.favourites);

  const loginUser = () => {
    setLoading(true);
    axios
      .post(`${API_URL}api/users/login`, {phoneNo: phone})
      .then(({data}) => {
        setToken(data.token);
        setFavourites(data.favourites);
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response) {
          toast.show("Already logged in other device", {
            placement: "bottom",
            type: "danger",
            duration: 2100,
          });
        }
      });
  };

  const logoutUser = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}api/users/logout`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => {
        setPhone("");
        setOtp("");
        setLoggedIn(false);
        setToken("");
        setExpires(Date.now());
        setFavourites([]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const favHandler = (id: string) => {
    if (favourites.includes(id)) remFav(id);
    else addFav(id);
  };

  const addFav = (val: string) => {
    if (favourites.includes(val)) return;
    setFavourites(prev => [val, ...prev]);
    axios
      .put(`${API_URL}api/users/add-favourite/${val}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {})
      .catch(console.log);
  };

  const remFav = (val: string) => {
    if (!favourites.includes(val)) return;
    setFavourites(prev => prev.filter(fav => fav !== val));
    axios
      .put(`${API_URL}api/users/remove-favourite/${val}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {})
      .catch(console.log);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const jsonContent = await AsyncStorage.getItem("locatory-user");
      if (jsonContent === null) {
        setLoading(false);
        return;
      } else {
        const localUserData = JSON.parse(jsonContent);
        setToken(localUserData.token || "");
        setFavourites(localUserData.favourites || []);
        setPhone(localUserData.phone || "");
        setOtp(localUserData.otp || "");
        setExpires(localUserData.expires || Date.now());
        setLoggedIn(localUserData.loggedIn || false);
        setLoading(false);
      }
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const storeData = async () => {
      const jsonContent = JSON.stringify({
        token,
        favourites,
        phone,
        otp,
        expires,
        loggedIn,
      });
      await AsyncStorage.setItem("locatory-user", jsonContent);
    };
    try {
      storeData();
    } catch (err) {
      console.log(err);
    }
  }, [token, favourites, phone, otp, expires, loggedIn]);

  return (
    <UserContext.Provider value={{
      phone, setPhone,
      otp, setOtp,
      loggedIn, setLoggedIn,
      expires, setExpires,
      token, setToken,
      loading, setLoading,
      favourites, setFavourites,
      logoutUser,
      loginUser,
      favHandler,
      addFav,
      remFav
    }}
    >{children}</UserContext.Provider>
  );
};
