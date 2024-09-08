import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { IncidentFormData } from "~/types/incident";

interface UpdateIncident {
  setLoading: (value: boolean) => void
  data: IncidentFormData
}

interface IncidentResponse {
  status: boolean
  message: string
}

export const useUpdateIncident = async ({setLoading, data}: UpdateIncident) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    const response = await axios.put<IncidentResponse>(
      `http://192.168.0.86/api/incidents/${data.id}`, 
      {...data}, 
      {headers: {Authorization: `Bearer ${token}`}}
    )

    console.log(response.data.status)
    if (response.data.status) {
      console.log('update - entrei aqui')
      setLoading(false)
      Alert.alert(
        "Editado com sucesso",
        "Seu incidente foi atualizado!",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace('/home')
            }
          }
        ]
      );
    }
  } catch (error: any) {
    console.log(error.response.data)
      if (error.response) {
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
    setLoading(false)
  }
}