import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { fetchIncidents } from '~/api/fetchIncidents';
import { fetchUser } from '~/api/fetchUser';
import { Incident } from '~/components/Incident';
import { Loading } from '~/components/Loading';
import { Search } from '~/components/Search';
import { RawIncidentsData } from '~/types/incident';
import { createEchoConnection } from '../echo';
import { useEffect } from 'react';
import { LogOut } from '~/components/Logout';

export default function Home () {

  const {data: user, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  })

  const {
    data: incidentsData,
    isLoading: isIncidentLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<RawIncidentsData>({
    queryKey: ['incidents'],
    queryFn: ({ pageParam }) => fetchIncidents(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage.incidents?.next_page_url;
      if (nextPageUrl) return lastPage.incidents?.current_page + 1
      return undefined
    },
  });

  useEffect(() => {
    if (user) createEchoConnection(user.id)
  }, [user]);

  const allIncidents = incidentsData?.pages.flatMap(page => page.incidents?.data || []);

  if (isLoading || isIncidentLoading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <SafeAreaView className={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={300} className={styles.containerHeader}>
          {user ? (
            <View className='flex-row justify-between'>
              <Text className={styles.message}>Olá, {user.name}</Text>
              <LogOut />
            </View>
          ) : (
            <Text className={styles.message}>Olá, Usuário</Text>
          )}
        </Animatable.View>
      
        <View className={styles.containerForm}>
          {
            allIncidents && allIncidents.length > 0 ? 
            (
            <>
              <Search />
              <FlatList
                className='mt-4'
                data={allIncidents}
                renderItem={({item})=> <Incident incident={item}/>}
                keyExtractor={(item) => item?.id.toString()}
                onEndReached={() => {
                  if (!isFetchingNextPage && hasNextPage) {
                    fetchNextPage();
                  }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
              />
            </>) : (
              <>
                <View className='flex flex-grow justify-center items-center'>
                  <Text>Você ainda não tem incidentes :D</Text>
                </View>
              </>
            )
          }
        
          <TouchableOpacity className='bg-main-red w-full rounded-md py-6 mt-4 justify-center items-center mb-2' onPress={() => router.push({ pathname: '/about', params: {user_id: user?.id} })}>
            <Text className='text-white text-lg font-bold'>
              Reportar novo incidente
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = {
  container: 'flex-1 bg-zinc-400',
  containerHeader: 'mx-6 my-10',
  message: 'text-3xl font-bold text-white',
  containerForm: 'flex-1 rounded-tl-3xl rounded-tr-3xl bg-white pl-5 pr-5',
  title: 'text-xl mt-7',
  input: 'border-b-2 h-10 mb-3 text-base',
  button: 'bg-main-red w-full rounded-md py-4 mt-4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
  buttonRegister: 'mt-4 self-center',
  registerText: 'color-gray-400',
};