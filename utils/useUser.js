import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./AxiosIntance";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      await axiosInstance
        .get(`https://lms-server-oqfi.onrender.com/api/me`, {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((error) => {
          setError(error?.message);
          setLoading(false);
        });
    };
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}