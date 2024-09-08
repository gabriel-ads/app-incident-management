import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useDeleteIncident = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    await axios.delete(`http://192.168.0.86/api/incidents/${id}`, { headers: {Authorization: `Bearer ${token}`} })

  } catch (error: any) {
    console.log(error)
  }
}