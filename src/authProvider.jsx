import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const axiosInstance = axios.create({
  baseURL: "",
 
});

export const AuthProvider = ({ children,user,setUser }) => {
  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://localhost:3000/v1/api/auth/refresh-token", {refreshToken: user?.refreshToken});

      if (response.status === 200) {
        const updatedUser = { ...user, accessToken: response.data.accessToken };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        return response.data.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error.response?.data?.message || error.message);
      logoutUser();
      return null;
    }
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return exp < Math.floor(Date.now() / 1000);
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  // Function to log out user and clear storage
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check token expiry periodically
  useEffect(() => {
    const checkToken = async () => {
   
      if (user?.accessToken && isTokenExpired(user.accessToken)) {
        console.log("user refresh",user.accessToken);
        
        await refreshAccessToken();

      }
    };

    checkToken();
    const interval = setInterval(checkToken, 10 * 60 * 1000); // Check every 14 mins
         
    return () => clearInterval(interval);
  }, [user]);

  // Attach Axios Interceptors
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.warn("Access token expired, attempting refresh...");

          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(error.config); // Retry request
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default axiosInstance;
