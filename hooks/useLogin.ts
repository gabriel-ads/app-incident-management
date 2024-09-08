import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"
import { LoginFormData } from "~/app/login"

interface LoginResponse {
  access_token: string
  expires_in: number
  status: boolean
  token_type: string
}

interface Login {
  setLoading: (value: boolean) => void
  data: LoginFormData
}

export const useLogin = async ({ setLoading, data }: Login) => {
  try {
    setLoading(true)
    const response = await axios.post<LoginResponse>('http://192.168.0.86/api/auth/login', {...data})

    const { access_token } = response.data;

    await AsyncStorage.setItem('jwt_token', access_token);

    router.replace('/home');
  } catch (error: any) {
      if(error.response){
        if (error.response.status === 401) {
          Alert.alert('Erro', 'Usuário ou senha inválido.');
        }
      }
    setLoading(false)
  }
}