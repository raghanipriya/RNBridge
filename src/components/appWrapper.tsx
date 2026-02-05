import NetInfo from '@react-native-community/netinfo';
import {useEffect} from 'react';
import {useNetworkStore} from '../store/useNetworkStore';

export default function AppWrapper({children}: any) {
  const setIsConnected = useNetworkStore(s => s.setIsConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = !!state.isConnected && !!state.isInternetReachable;
      setIsConnected(online);
    });

    return unsubscribe;
  }, []);

  return children;
}
