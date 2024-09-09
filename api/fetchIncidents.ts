import { RawIncidentsData } from "~/types/incident";
import { createAxiosInstance } from ".";
import { router } from "expo-router";
import { Alert } from "react-native";

export const fetchIncidents = async (pageValue: number) => {
  const { axiosInstance } = await createAxiosInstance()

  try {
    const incidentsResponse = await axiosInstance.get<RawIncidentsData>(`/incidents?page=${pageValue}`)

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
    throw new Error('Failed to fetch incidents');
  }
}