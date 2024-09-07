import axios from 'axios';
import { router } from 'expo-router';
import  React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { Input } from '~/components/Input';

interface FormData {
  name: string
  email: string
  password: string
}
interface User {
  name: string
  email: string
  updated_at: string
  created_at: string
  id: number
}
interface RegisterResponse {
  status: boolean
  user: User
  message: string
}



export default function Register() {
  const [loading, setLoading] = useState<boolean>(false)

  const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
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
          <Text className={styles.message}>Registre-se</Text>
        </Animatable.View>
      
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

          <Controller 
            control={control}
            name='name'
            rules={{
              required: "Digite seu nome",
              pattern:{
                value: /^[A-Za-zÀ-ÖØ-ÿ\u00C0-\u024F\u1E00-\u1EFF\s'-]+$/,
                message: 'Digite um nome válido'
              }
            }}
            render={({field: {value, onChange}})=>(
              <Input
                title='Nome' 
                placeholder='Digite seu nome' 
                value={value} 
                onChangeText={onChange} 
              />
            )}
          />
          {errors.name && <Text className='text-red-500'>{errors.name.message}</Text>}

          <Controller 
            control={control}
            name='email'
            rules={{
              required: "Digite seu e-mail",
              pattern: {
                message: "E-mail inválido",
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              }
            }}
            render={({field: {value, onChange}})=>(
              <Input
                title='Email' 
                placeholder='Digite seu melhor email' 
                value={value} 
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text className='text-red-500'>{errors.email.message}</Text>}

          <Controller 
            control={control}
            name='password'
            rules={{
              required: "Digite sua senha",
              minLength: {
                value: 6,
                message: 'A senha precisa ter no minimo 6 caracteres'
              }
            }}
            render={({field: {value, onChange}})=>(
              <Input
                title='Senha' 
                placeholder='Crie uma senha' 
                value={value} 
                onChangeText={onChange} 
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}
        
          <TouchableOpacity className={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text className={styles.buttonText}>Cadastrar</Text>
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
  title: 'text-xl mt-7',
  input: 'border-b-2 border-gray-400 h-10 mb-3 text-base',
  button: 'bg-main-red w-full rounded-md py-4 mt-4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
  buttonRegister: 'mt-4 self-center',
  registerText: 'color-gray-400',
};