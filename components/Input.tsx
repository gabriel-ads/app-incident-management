import { Feather } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import {Text, TextInput, TextInputProps } from 'react-native'

type InputProps = {
  title: string
} & TextInputProps

export function Input({title, ...props}: InputProps) {

  return (
    <>   
      <Text className={styles.title}>{title}</Text>
      <TextInput 
        className={styles.input} 
        {...props}   
      />
    </>
  )
}

const styles = {
  title: 'text-xl mt-7',
  input: 'border-b-2 border-gray-400 h-10 mb-3 text-base',
}



