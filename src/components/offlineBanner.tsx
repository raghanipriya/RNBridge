import {View, Text} from 'react-native';
import {useNetworkStore} from '../store/useNetworkStore';

export const OfflineBanner = () => {
  const isConnected = useNetworkStore(s => s.isConnected);

  if (isConnected) return null;

  return (
    <View
      style={{
        backgroundColor: 'red',
        padding: 8,
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>No Internet Connection</Text>
    </View>
  );
};
