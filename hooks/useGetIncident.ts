import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { RawIncidentsData } from "~/types/incident";
import { User } from "~/types/user";

interface GetIncident {
  setLoading: (value: boolean) => void
  setUser: (user: User) => void
  setIncidentsData: (incidentData: RawIncidentsData) => void
}

export const useGetIncident = async ({setIncidentsData, setLoading, setUser}: GetIncident) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    const user = await axios.post<User>('http://192.168.0.86/api/auth/me', {}, {headers: {Authorization: `Bearer ${token}`}})
    if(user.data) setUser(user.data)
    setLoading(false)

    const incidentsData = await axios.get<RawIncidentsData>('http://192.168.0.86/api/incidents', {headers: {Authorization: `Bearer ${token}`}})
    if(incidentsData.data) setIncidentsData(incidentsData.data)

  } catch (error: any) {
    console.log(error)
    if (error.response.status === 401) {
      Alert.alert(
        "Sessão expirada",
        "Faça login novamente para continuar",
        [
          {
            text: "OK",
            style: "cancel",
            onPress: () => {
              router.replace('/login')
            }
          }
        ]
      );
    }
  }
}