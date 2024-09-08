import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from 'expo-router'
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native'

interface Incidents {
  current_page: number
  data: Daum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Daum {
  id: number
  name: string
  evidence: string
  criticality: number
  host: string
  created_at: string
  updated_at: string
  user_id: number
  deleted_at: any
}

interface Link {
  url?: string
  label: string
  active: boolean
}

export interface IncidentsData {
  status: boolean
  incidents: Incidents
}

interface IncidentProps {
  incidents: Incidents
}

interface IconFeaturesReturnValue {
  color: string, 
  icon: 'alert-circle' | 'alert-octagon' | 'alert-triangle' | 'alert-octagon'
}

type IconFeatures = {
  [key: number]: IconFeaturesReturnValue;
};

const iconFeatures: IconFeatures = {
  1: {color: '#ffffff', icon: 'alert-circle'},
  2: {color: '#3498DB', icon: 'alert-octagon'},
  3: {color: '#F4D03F', icon: 'alert-triangle'},
  4: {color: '#E74C3C', icon: 'alert-octagon'},
};

const getIconFeaturesCriticality = (criticality: number): IconFeaturesReturnValue => {
  return iconFeatures[criticality] || iconFeatures[1];
};

const deleteIncident = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    await axios.delete(`http://192.168.0.86/api/incidents/${id}`, { headers: {Authorization: `Bearer ${token}`} })

  } catch (error: any) {
    console.log(error)
  }
}

const handleNavigate = (data: Pick<Daum, 'id' | 'name' | 'evidence' | 'host' | 'criticality' | 'user_id'>) => {
  router.push({ pathname: '/about', params: data });
};

export function IncidentList({incidents: {data}}: IncidentProps) {

  const handleDelete = (id: number) => {
      Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza de que deseja excluir este incidente?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: () => {
              deleteIncident(id)
            }
          }
        ]
      );
  }
  return (
    <>
      <ScrollView>
        <View className='flex gap-2 mt-4'>
          {
            data.map(({ criticality, name, host, evidence, id, user_id })=>{
              return (
                <TouchableOpacity key={id} onPress={() => handleNavigate({criticality, name, host, evidence, id, user_id})}>
                  <View className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-24 rounded-3xl'>
                    <View className='flex h-full w-12 rounded-l-2xl justify-center items-center border-r-2 border-zinc-500'>
                      <Feather name={getIconFeaturesCriticality(criticality).icon} size={28} color={getIconFeaturesCriticality(criticality).color} />
                    </View>
                    <View className='flex flex-1 justify-center ml-2 pr-4'>
                      <Text 
                        className='text-white font-bold text-2xl'
                        numberOfLines={1} 
                        ellipsizeMode='tail'>
                          {name}
                      </Text>
                      <Text className='text-black'>{host}</Text>
                    </View>
                    <TouchableOpacity className='flex w-12 flex-row items-center justify-center' onPress={() => handleDelete(id)}>
                      <Feather name='trash-2' size={28} color={'#E74C3C'} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    </>
  )
}
