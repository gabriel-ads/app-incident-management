import {TextInput, View } from 'react-native'
import { Feather, } from '@expo/vector-icons'

export function Search() {
  return (
    <>
      <View className='w-full flex-row border-zinc-400 h-14 rounded-full items-center gap-2 px-4 border-2 mt-2'>
        <Feather name='search' size={24} color="#64748b"/>

        <TextInput 
          placeholder='Digite um incidente'
          className='w-full h-full flex-1 bg-transparent'
        />
      </View>
    </>
  )
}

