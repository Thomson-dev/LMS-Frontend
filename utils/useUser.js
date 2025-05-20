useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
    

      await axiosInstance
        .get(`https://lms-server-oqfi.onrender.com/api/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            
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