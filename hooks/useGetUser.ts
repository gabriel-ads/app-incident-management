import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { User } from "~/types/user";

interface UserProps{
  setUser: (user: User) => void
} 


export const useGetUser = async ({ setUser }: UserProps) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    const user = await axios.post<User>('http://192.168.0.86/api/auth/me', {}, {headers: {Authorization: `Bearer ${token}`}})
    if(user.data) setUser(user.data)
  } catch (error: any) {
    console.log(error)
  }
 
}