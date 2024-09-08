import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { RawIncidentsData } from "~/types/incident";

interface GetIncident {
  setLoading: (value: boolean) => void
 
  setIncidentsData: (incidentData: RawIncidentsData) => void
}

export const useGetIncident = async ({setIncidentsData, setLoading}: GetIncident) => {
  try {
    setLoading(false)
    const token = await AsyncStorage.getItem('jwt_token');

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