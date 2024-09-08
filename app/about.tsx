import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { SelectList } from 'react-native-dropdown-select-list'
import { Input } from '~/components/Input';

interface IncidentData {
  id: number,
  name: string,
  evidence: string,
  criticality: number
  host: string
  user_id: number
}

interface IncidentResponse {
  status: boolean
  message: string
}

export default function About() {
  const [loading, setLoading] = useState<boolean>(false)
  const incidentSearchParams = useLocalSearchParams();

  console.log(typeof incidentSearchParams.user_id)
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IncidentData>({
    defaultValues: { ...incidentSearchParams}
  })

  const data = [
      {key: 1, value:'Observação'},
      {key: 2, value:'Alerta'},
      {key: 3, value:'Perigoso'},
      {key: 4, value:'Crítico'}
  ]

  const valueMapper = data.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<number, string>);

  const onSubmit = async (data: IncidentData) => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.post<IncidentResponse>(
        'http://192.168.0.86/api/incidents', 
        {...data}, 
        {headers: {Authorization: `Bearer ${token}`}}
      )

      console.log(response.data)
      if(response.data.status) {
        Alert.alert(
          "Cadastrado com sucesso",
          "Deseja cadastrar um novo incidente?",
          [
            {
              text: "Não",
              style: "cancel",
              onPress: () => {
                reset({
                  criticality: undefined,
                  evidence: undefined,
                  name: undefined,
                  host: undefined,
                  id: undefined,
                })
                router.push('/home')
              }
            },
            {
              text: "Sim",
              onPress: () => {
                reset({
                  criticality: 0,
                  evidence: '',
                  name: '',
                  host: '',
                  id: 0,
                  user_id: parseInt(incidentSearchParams.user_id as string) 
                })
              }
            }
          ]
        );
        
      }
    } catch (error: any) {
      console.log(error.response.data)
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert(
              "Sessão expirada",
              "Faça login novamente para continuar",
              [
                {
                  text: "OK",
                  style: "cancel",
                  onPress: () => {
                    router.replace('/login')
                  }
                }
              ]
            );
          }
        }
      setLoading(false)
    }
  }

  return (
    <>
      
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Sobre o incidente</Text>
        </Animatable.View>
      
      
        <Animatable.View animation="fadeInUp" className={styles.containerForm}>

        <Controller
            name='name'
            control={control}
            rules={{
              required: "Digite o título do incidente",
              pattern: {
                message: 'Digite um título válido',
                value: /^[A-Za-zÀ-ÖØ-ÿ\u00C0-\u024F\u1E00-\u1EFF0-9\s'!@#$%^&*()_+=\[\]{};:'",.<>/?\\|`~\u00A0-\u00FF]+$/
              }
            }}
            render={({field: {value, onChange}}) => (
              <Input 
                title='Título' 
                placeholder='Título do incidente'
                value={value} 
                onChangeText={onChange}
                blurOnSubmit={false} />
            )}
          />
          {errors.name && <Text className='text-red-500'>{errors.name.message}</Text>}
        
        <Text className={styles.title}>Descrição</Text>
        <Controller
            name='evidence'
            control={control}
            rules={{
              required: "Digite a descrição do incidente",
              minLength: {
                message: 'Digite no minimo 15 letras',
                value: 15
              },
              pattern: {
                message: 'Digite uma descrição válida',
                value: /^[A-Za-zÀ-ÖØ-ÿ\u00C0-\u024F\u1E00-\u1EFF0-9\s'!@#$%^&*()_+=\[\]{};:'",.<>/?\\|`~\u00A0-\u00FF]+$/
              }
            }}
            render={({field: {value, onChange}}) => (
              <TextInput
                multiline={true}
                numberOfLines={10}
                className={'pl-1 pt-1 border-2 border-gray-400 mb-3 text-base h-24 align-top'}
                placeholder='Descrição do incidente'
                value={value}
                onChangeText={onChange}
                 />
            )}
          />
          {errors.evidence && <Text className='text-red-500'>{errors.evidence.message}</Text>}
          
          <Controller
            name='host'
            control={control}
            rules={{
              required: "Digite o host do incidente",
              pattern: {
                message: 'Digite um host válido',
                value: /^((?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,}|xn--[a-zA-Z0-9-]{2,})|localhost)(\/[^\s]*)?$/
              }
            }}
            render={({field: {value, onChange}}) => (
              <Input 
                title='Host' 
                placeholder='Host afetado'
                value={value} 
                onChangeText={onChange}
                 />
            )}
          />
          {errors.host && <Text className='text-red-500'>{errors.host.message}</Text>}

          <Text className={styles.title}>Criticidade</Text>
          <Controller
            name='criticality'
            control={control}
            rules={{
              required: "Selecione a criticidade do incidente",
            }}
            render={({field: {value, onChange}}) => (
              <SelectList
                setSelected={onChange} 
                data={data} 
                save="key"
                search={false}
                defaultOption={{ key: value, value: valueMapper[value] }}
                placeholder='Selecione'
              />  
            )}
          />
          {errors.criticality && <Text className='text-red-500'>{errors.criticality.message}</Text>}
          
        
          <TouchableOpacity className={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text className={styles.buttonText}>{incidentSearchParams.id ? 'Editar' : 'Cadastrar'}</Text>
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