import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link } from 'expo-router'
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native'

type ColorMap = {
  [key: number]: string;
};

const colorMap: ColorMap = {
  1: '#ffffff',
  2: '#3498DB',
  3: '#F4D03F',
  4: '#E74C3C',
};

const getColorByCriticality = (number: number): string => {
  return colorMap[number] || '#ffffff';
};

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

interface Daum {
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

const deleteIncident = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    await axios.delete(`http://192.168.0.86/api/incidents/${id}`, { headers: {Authorization: `Bearer ${token}`} })

  } catch (error: any) {
    console.log(error)
  }
}

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
            data.map(({criticality, name, host, id})=>{
              return (
                <View key={id} className='flex flex-row border-zinc-400 border-2 bg-zinc-400 h-24 rounded-3xl'>
                  <View className='flex h-full w-12 rounded-l-2xl justify-center items-center border-r-2 border-zinc-500'>
                    <Feather name='x-octagon' size={28} color={getColorByCriticality(criticality)}/>
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
                  <View className='flex w-12 flex-row items-center justify-center'>
                    <Feather name='trash-2' size={28} color={'#E74C3C'} onPress={() => handleDelete(id)}/>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </>
  )
}
