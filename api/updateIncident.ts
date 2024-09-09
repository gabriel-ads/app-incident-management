import { IncidentFormData, IncidentResponse } from "~/types/incident";
import { createAxiosInstance } from ".";
import { Alert } from "react-native";
import { router } from "expo-router";

export const updateIncident = async (data: IncidentFormData) => {
  const { axiosInstance } = await createAxiosInstance()

  try {
    const incidentsResponse = await axiosInstance.put<IncidentResponse>(`/incidents/${data.id}`, {...data})

    return incidentsResponse.data
  } catch (error: any) {
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
    throw new Error('Failed to update incidents');
  }
}