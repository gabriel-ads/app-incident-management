import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { UseFormReset } from "react-hook-form";
import { Alert } from "react-native";
import { IncidentFormData, IncidentResponse } from "~/types/incident";

interface CreateIncident {
  setLoading: (value: boolean) => void
  reset: UseFormReset<IncidentFormData>
  data: IncidentFormData
  userId: number
}


export const useCreateIncident = async ({setLoading, reset, data, userId}: CreateIncident) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    const response = await axios.post<IncidentResponse>(
      'http://192.168.0.86/api/incidents', 
      {...data}, 
      {headers: {Authorization: `Bearer ${token}`}}
    )

    console.log(response.data.status)
    if (response.data.status) {
      console.log('create - entrei aqui')
      setLoading(false)
      Alert.alert(
        "Cadastrado com sucesso",
        "Deseja cadastrar um novo incidente?",
        [
          {
            text: "Não",
            style: "cancel",
            onPress: () => {
              reset({
                criticality: 0,
                evidence: '',
                name: '',
                host: '',
                id: 0,
                user_id: userId 
              })
              router.push('/home')
            }
          },
          {
            text: "Sim",
            onPress: () => {
              reset({
                criticality: 0,
                evidence: '',
                name: '',
                host: '',
                id: 0,
                user_id: userId 
              })
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