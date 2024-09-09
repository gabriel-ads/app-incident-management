import { useMutation } from '@tanstack/react-query';
import {router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { SelectList } from 'react-native-dropdown-select-list'
import { createIncident } from '~/api/createIncident';
import { updateIncident } from '~/api/updateIncident';
import { Input } from '~/components/Input';
import { IncidentFormData } from '~/types/incident';
import { criticalityData, criticalityValueMapper } from '~/utils/criticalityValueMapper';

interface createInterface{
  data: IncidentFormData, userId: number
}

export default function About() {
  const incidentSearchParams = useLocalSearchParams();

  
  const updateIncidentMutation = useMutation({
    mutationFn: (data: IncidentFormData) => updateIncident(data)
  })
  
  const createIncidentMutation = useMutation({
    mutationFn: ({ data,userId }: createInterface) => createIncident(data, userId)
  })
  
  const { control, handleSubmit, formState: { errors } } = useForm<IncidentFormData>({
    defaultValues: { ...incidentSearchParams}
  })

  const loading = updateIncidentMutation.isPending || createIncidentMutation.isPending

  const userId = parseInt(incidentSearchParams?.user_id as string )

  const onSubmit = async (data: IncidentFormData) => {

    if(data.id && data.user_id){
      updateIncidentMutation.mutate(data)
    } else createIncidentMutation.mutate({ data, userId })
  }

  updateIncidentMutation.isSuccess ? Alert.alert(
    "Editado com sucesso",
    "Seu incidente foi atualizado!",
    [
      {
        text: "OK",
        onPress: () => {
          router.back()
        }
      }
    ]
  ): null
  
  createIncidentMutation.isSuccess  ? Alert.alert(
    "Criado com sucesso",
    "Seu incidente foi criado!",
    [
      {
        text: "OK",
        onPress: () => {
          router.back()
        }
      }
    ]
  ): null

  
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
                blurOnSubmit={false}
                editable={!loading} />
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
                editable={!loading} />
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
                editable={!loading} />
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
                data={criticalityData} 
                save="key"
                search={false}
                defaultOption={{ key: value, value: criticalityValueMapper[value] }}
                placeholder='Selecione'
              />
            )}
          />
          {errors.criticality && <Text className='text-red-500'>{errors.criticality.message}</Text>}
          
          <TouchableOpacity className={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className={styles.buttonText}>  
                {incidentSearchParams.id ? 'Editar' : 'Cadastrar'}
              </Text>
            )}
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