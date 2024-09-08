import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { IncidentList} from '~/components/IncidentList';
import { Search } from '~/components/Search';
import { useGetIncident } from '~/hooks/useGetIncident';
import { RawIncidentsData } from '~/types/incident';
import { User } from '~/types/user';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User>()
  const [incidentsData, setIncidentsData] = useState<RawIncidentsData>()
  
  useEffect(() => {
    if (!incidentsData) useGetIncident({ setIncidentsData, setLoading, setUser })
  }, [])

  if(loading){
    return(
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#A04747" />
        <Text>Carregando...</Text>
      </View>
    )
  }
  return (
    <>
      
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          <Text className={styles.message}>Olá, {user?.name}</Text>
        </Animatable.View>
      
        <View className={styles.containerForm}>
          <Search />
          {incidentsData && <IncidentList incidents={incidentsData.incidents} />}
          
          <Link href={{ pathname: '/about', params: {user_id: user?.id}}} asChild>
              <TouchableOpacity className='bg-main-red w-full rounded-md py-6 mt-4 justify-center items-center mb-2'>
                <Text className='text-white text-lg font-bold'>
                  Reportar novo incidente
                </Text>
              </TouchableOpacity>
          </Link>
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