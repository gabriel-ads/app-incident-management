import { router } from "expo-router";
import { Alert } from "react-native";
import { createAxiosInstance } from ".";
import { User } from "~/types/user";

export const fetchUser = async () => {
  const { axiosInstance } = await createAxiosInstance()

  try {
    const userResponse = await axiosInstance.post<User>('/auth/me')

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
    throw new Error('Failed to fetch user');
  }
}