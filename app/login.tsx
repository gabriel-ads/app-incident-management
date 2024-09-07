import {Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <>
      
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>
      
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

          <Text className={styles.title}>Email</Text>
          <TextInput className={styles.input} placeholder='Digite um email'/>

          <Text className={styles.title}>Senha</Text>
          <TextInput className={styles.input}placeholder='Sua senha'/>
        

          <TouchableOpacity className={styles.button}>
            <Link href={{ pathname: '/home'}}>
              <Text className={styles.buttonText}>Acessar</Text>
            </Link>
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
  title: 'text-xl mt-7',
  input: 'border-b-2 h-10 mb-3 text-base',
  button: 'bg-main-red w-full rounded-md py-4 mt-4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
  buttonRegister: 'mt-4 self-center',
  registerText: 'color-gray-400',
};