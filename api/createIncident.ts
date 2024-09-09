import { IncidentFormData, IncidentResponse } from "~/types/incident";
import { createAxiosInstance } from ".";
import { Alert } from "react-native";
import { router } from "expo-router";

export const createIncident = async (data: IncidentFormData, userId: number) => {
  const { axiosInstance } = await createAxiosInstance()

  try {
    const incidentResponse = await axiosInstance.post<IncidentResponse>('/incidents', {...data})

    return incidentResponse.data
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data)
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
    throw new Error('Failed to create incidents');
  }
}