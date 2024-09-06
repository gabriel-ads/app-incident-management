import { Stack, Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <>
      <Stack.Screen options={{headerShown: false }} />
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={600} className={styles.containerHeader}>
          <Text className={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>
      
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

          <Text className='text-xl mt-7'>Email</Text>
          <TextInput className='border-b-2 h-10 mb-3 text-base' placeholder='Digite um email'/>

          <Text className=''>Senha</Text>
          <TextInput placeholder='Sua senha'/>
        

          <TouchableOpacity className=''>
            <Text className=''>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity className=''>
            <Text className=''>Não Possui uma conta? Cadastre-se</Text>
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
  title: '',
  input: '',
  button: '',
  buttonText: '',
  buttonRegister: '',
  registerText: '',
};