import axios from 'axios';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { Input } from '~/components/Input';


interface FormData {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  expires_in: number
  status: boolean
  token_type: string
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false)
  const {control, handleSubmit, formState: { errors }} = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
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

  if(loading){
    return(
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#A04747" />
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

          <Controller
            name='email'
            control={control}
            rules={{
              required: "Digite seu e-mail",
              pattern: {
                message: "E-mail inválido",
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              }
            }}
            render={({field: {value, onChange}}) => (
              <Input
                title='E-mail'
                placeholder='Digite um email' 
                value={value} 
                onChangeText={onChange}/>
            )}
          />
          {errors.email && <Text className='text-red-500'>{errors.email.message}</Text>}

          <Controller
            control={control}
            name='password'
            rules={{
              required: "Digite sua senha"
            }}
            render={({field: {value, onChange}}) => (
              <Input
                title='Senha' 
                placeholder='Sua senha' 
                value={value} 
                onChangeText={onChange} 
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}

          <TouchableOpacity className={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text className={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity className={styles.buttonRegister}>
            <Link href={{ pathname: '/register'}}>
              <Text className={styles.registerText}>Não Possui uma conta? Cadastre-se</Text>
            </Link>
          </TouchableOpacity>

        </Animatable.View>

      </SafeAreaView>
    </>
  );
}

const styles = {
  container: 'flex-1 bg-zinc-400',
  containerHeader: 'mt-10 mb-12 pl-10',
  message: 'text-3xl font-bold text-white',
  containerForm: 'flex-1 rounded-tl-3xl rounded-tr-3xl bg-white pl-5 pr-5',
  button: 'bg-main-red w-full rounded-md py-4 mt-4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
  buttonRegister: 'mt-4 self-center',
  registerText: 'color-gray-400',
  loading: ''
};