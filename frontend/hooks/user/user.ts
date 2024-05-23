// در فایل user.js
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { getCookie } from "cookies-next";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const token = getCookie('access');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://127.0.0.1:8000/api/dashboard/', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  return userData;
};

export default useUserData;
