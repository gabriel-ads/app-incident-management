import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

import { Stack } from 'expo-router';

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false }} />
        <Stack.Screen name="login" options={{headerShown: false }} />
        <Stack.Screen name="register" options={{headerShown: false }} />
        <Stack.Screen name="home" options={{headerShown: false }} />
        <Stack.Screen name="about" options={{headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
