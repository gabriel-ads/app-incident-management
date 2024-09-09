import axios from "axios";
import { Alert } from "react-native";
import { RegisterFormData } from "~/app/register";
import { RegisterResponse } from "~/types/user";
import { createAxiosInstance } from ".";
import { router } from "expo-router";

export const registerUser = async (data: RegisterFormData) => {
  const { axiosInstance } = await createAxiosInstance()
  try {
    await axiosInstance.post<RegisterResponse>('/users', {...data})

    Alert.alert('Sucesso', 'Usuário criado com sucesso');

    router.replace('/login');
  } catch (error: any) {
    if(error.response){
      if (error.response.status === 422) {
        Alert.alert('Erro', 'O E-mail já está em uso!');
      }
    }
    throw new Error('Failed to register user');
  }
}