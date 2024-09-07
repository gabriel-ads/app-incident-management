import { Link } from 'expo-router';
import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { SelectList } from 'react-native-dropdown-select-list'

export default function About() {
  const [selected, setSelected] = useState("");
  console.log(selected)
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  return (
    <>
      
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Sobre o incidente</Text>
        </Animatable.View>
      
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

          <Text className={styles.title}>Titulo</Text>
          <TextInput className={styles.input} placeholder='Titulo do incidente'/>

          <Text className={styles.title}>Descrição</Text>
          <TextInput  multiline={true} numberOfLines={10} className={'pl-1 pt-1 border-2 border-gray-400 mb-3 text-base h-24 align-top'} placeholder='Descrição do incidente'/>

          <Text className={styles.title}>Host</Text>
          <TextInput className={styles.input} placeholder='Host afetado'/>

          <Text className={styles.title}>Criticidade</Text>
          <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
          />  
        
          <TouchableOpacity className={styles.button}>
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
  title: 'text-xl mt-7 mb-1',
  input: 'pl-1 border-b-2 border-gray-400 h-10 mb-3 text-base',
  button: 'bg-main-red w-full rounded-md py-4 mt-4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
  buttonRegister: 'mt-4 self-center',
  registerText: 'color-gray-400',
};