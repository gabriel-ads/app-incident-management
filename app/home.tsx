import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { Search } from '~/components/Search';

export default function Register() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <>
      
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Olá, nome</Text>
        </Animatable.View>
      
      
        <View className={styles.containerForm}>
          <Search />

          <ScrollView>
            <View className='flex gap-2 mt-4'>

              <View className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-20 rounded-3xl '>
                <View className='flex h-full w-12 rounded-l-2xl justify-center items-center '>
                  <Feather name='x-octagon' size={28} color={'#E74C3C'}/>
                </View>
                <View className='flex justify-center'>
                  <Text className='text-white font-bold text-2xl'>Titulo grande para testar</Text>
                  <Text className='text-black'>serasa.com.br</Text>
                </View>
              </View>

              <View className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-20 rounded-3xl '>
                <View className='flex h-full w-12 rounded-l-2xl justify-center items-center '>
                  <Feather name='alert-triangle' size={28} color={'#F4D03F'}/>
                </View>
                <View className='flex justify-center'>
                  <Text className='text-white font-bold text-2xl'>Titulo grande para testar</Text>
                  <Text className='text-black'>serasa.com.br</Text>
                </View>
              </View>

              <View className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-20 rounded-3xl '>
                <View className='flex h-full w-12 rounded-l-2xl justify-center items-center '>
                  <Feather name='alert-circle' size={28} color={'#3498DB'}/>
                </View>
                <View className='flex justify-center'>
                  <Text className='text-white font-bold text-2xl'>Titulo grande para testar</Text>
                  <Text className='text-black'>serasa.com.br</Text>
                </View>
              </View>

              <View className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-20 rounded-3xl '>
                <View className='flex h-full w-12 rounded-l-2xl justify-center items-center '>
                  <Feather name='alert-octagon' size={28} color={'#ffffff'}/>
                </View>
                <View className='flex justify-center'>
                  <Text className='text-white font-bold text-2xl'>Titulo grande para testar</Text>
                  <Text className='text-black'>serasa.com.br</Text>
                </View>
              </View>

            </View>
            
          </ScrollView>
        </View>
        

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