import { Alert } from "react-native";
import { LoginResponse } from "~/types/user";
import { createAxiosInstance } from ".";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginFormData } from "~/app/login";

export const login = async (data: LoginFormData) => {
  const { axiosInstance } = await createAxiosInstance()
  try {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', {...data})

    const { access_token } = response.data;

    await AsyncStorage.setItem('jwt_token', access_token);

    router.replace('/home');
  } catch (error: any) {
    if(error.response){
      if (error.response.status === 401) {
        Alert.alert('Erro', 'E-mail ou senha incorreto');
      }
    }
    throw new Error('Failed to login user');
  }
}