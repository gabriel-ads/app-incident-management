import AsyncStorage from '@react-native-async-storage/async-storage';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';

window.Pusher = Pusher;

export const createEchoConnection = async (userId) => {
    

    const token = await AsyncStorage.getItem('jwt_token');

    const echo = new Echo({
        broadcaster: 'pusher',
        key: 'b41fb85dbcedb5bfd5ac',
        cluster: 'us2',
        forceTLS: true,
    });

    echo.channel(`incident.${userId}`)
            .listen('IncidentBroadcast', (event) => {
                console.log('Incident Created:', event);
            }).error((error) => {
                console.error('Echo Error:', error);
            });

    return () => {
        echo.leaveChannel(`incident.${userId}`);
    };

}
