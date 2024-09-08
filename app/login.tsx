import axios from 'axios';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { Input } from '~/components/Input';
import { useLogin } from '~/hooks/useLogin';
import { Loading } from '~/components/Loading';


export interface LoginFormData {
  email: string
  password: string
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false)
  const {control, handleSubmit, formState: { errors }} = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
   await useLogin({ data, setLoading})
  }

  if(loading){
    return(
      <Loading />
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
                placeholder='Digite um e-mail' 
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