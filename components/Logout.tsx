import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

const handlePress = () => {
  Alert.alert(
    "Sair",
    "Realmente deseja deslogar?",
    [
      {
        text: "Não",
        style: 'cancel'
      },
      {
        text: "Sim",
        onPress: async () => {
          await AsyncStorage.removeItem('jwt_token')
          router.replace('/')
        }
      }
    ]
  )
}

export function LogOut() {
  return (
    <Feather name={'log-out'} size={28} color={'#E74C3C'} onPress={handlePress}/>
  )
}

