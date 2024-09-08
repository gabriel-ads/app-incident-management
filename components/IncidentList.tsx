import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native'
import { useDeleteIncident } from '~/hooks/useDeleteIncident';
import { FullyIncidentsResponse, IncidentFormData } from '~/types/incident';
import { getIconFeaturesByCriticality } from '~/utils/getIconFeaturesByCriticality';

interface IncidentProps {
  incidents: FullyIncidentsResponse
}

const handleNavigate = (data: IncidentFormData) => {
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
              useDeleteIncident(id)
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
                      <Feather name={getIconFeaturesByCriticality(criticality).icon} size={28} color={getIconFeaturesByCriticality(criticality).color} />
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
