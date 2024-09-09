import { router } from "expo-router";
import { Alert } from "react-native";
import { createAxiosInstance } from ".";

export const deleteIncident = async (id: number) => {
  const { axiosInstance } = await createAxiosInstance()

  try {
    const userResponse = await axiosInstance.delete(`/incidents/${id}`)

    return userResponse.data
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
    throw new Error('Failed to delete user');
  }
}