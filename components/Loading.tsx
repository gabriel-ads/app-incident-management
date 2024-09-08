import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native-animatable";


export function Loading() {
  return (
    <>   
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#A04747" />
        <Text>Carregando...</Text>
      </View>
    </>
  )
}



