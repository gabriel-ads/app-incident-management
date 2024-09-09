import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

export const createAxiosInstance = async () => {
  const token =  await AsyncStorage.getItem('jwt_token');

  return {
    axiosInstance: axios.create({
      baseURL: baseUrl,
      headers: 
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    })
  }
}