import { Link } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Index() {
  return (
    <>
      <View className={styles.container}>
        <View className={styles.containerLogo}>
          <Animatable.Image
          animation="flipInY"
          source={require('../assets/incident-manager-logo.png')}
          className='w-full h-full'
          resizeMode='contain'
          />
        </View>

        <Animatable.View className={styles.containerForm} delay={600} animation="fadeInUp">
          <Text className={styles.title}>Gerencie os problemas de segurança da sua empresa!</Text>
          <Text className={styles.text}>Faça o login para ter acesso</Text>

          <Link href={{ pathname: '/login'}} asChild>
            <TouchableOpacity className={styles.button}>
              <Text className={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Link>
        </Animatable.View>
      </View>
    </>
  );
}

const styles = {
  container: 'flex-1 bg-zinc-400',
  containerLogo: 'flex-2 justify-center items-center',
  containerForm: 'flex-1 rounded-tl-3xl rounded-tr-3xl bg-white pl-5 pr-5',
  title: 'text-2xl mt-7 mb-3 font-bold',
  text: 'color-gray-400',
  button: 'absolute bg-main-red rounded-3xl py-4 w-7/12 self-center bottom-1/4 justify-center items-center',
  buttonText: 'text-white text-lg font-bold',
};