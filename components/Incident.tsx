import { Feather } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router'
import { memo } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import { deleteIncident } from '~/api/deleteIncident';
import { IncidentInterface, IncidentFormData } from '~/types/incident';
import { getIconFeaturesByCriticality } from '~/utils/getIconFeaturesByCriticality';

interface IncidentProps {
  incident: IncidentInterface
}

const handleNavigate = (data: IncidentFormData) => {
  router.push({ pathname: '/about', params: data });
};

interface deleteInterface {
  id: number
  deleteIncidentMutation: (id: number) => void
}


const handleDelete = ({id, deleteIncidentMutation}: deleteInterface) => {
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
          deleteIncidentMutation(id)
        }
      }
    ]
  );
}

export const Incident = memo(({incident}: IncidentProps) => {
  const { criticality, name, host, evidence, id, user_id } = incident
  const queryClient = useQueryClient()

  const {mutate: deleteIncidentMutation} = useMutation({
    mutationFn: (id: number) => deleteIncident(id),
    onSuccess: () => { 
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['incidents'] });
      }, 3000);
  }
    
  })

  if (!incident) {
    return null;
  }

  return (
    <>
    {incident && 
      (<View className='flex mt-2'>
        <TouchableOpacity onPress={() => handleNavigate({criticality, name, host, evidence, id, user_id})}>
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
            <TouchableOpacity className='flex w-12 flex-row items-center justify-center' onPress={() => handleDelete({id, deleteIncidentMutation})}>
              <Feather name='trash-2' size={28} color={'#E74C3C'} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>)
    }
        
    </>
  )
})
