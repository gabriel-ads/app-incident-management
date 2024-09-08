import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"
import { RegisterFormData } from "~/app/register"
import { User } from "~/types/user"

interface RegisterResponse {
  status: boolean
  user: User
  message: string
}

interface Register {
  setLoading: (value: boolean) => void
  data: RegisterFormData
}

export const useRegister = async ({ setLoading, data }: Register) => {
  try {
    setLoading(true)
    await axios.post<RegisterResponse>('http://192.168.0.86/api/users', {...data})

    Alert.alert('Sucesso', 'Usuário criado com sucesso');

    router.replace('/login');
  } catch (error: any) {
    console.log(error)
      if(error.response){
        if (error.response.status === 422) {
          Alert.alert('Erro', 'O E-mail já está em uso!');
        }
      }
    setLoading(false)
  }
}