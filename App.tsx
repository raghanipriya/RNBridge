import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  Linking,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const {BatteryModule} = NativeModules;
import NativeLocalStorage from './specs/NativeLocalStorage';

import NativeBatteryLevel from './specs/NativeBatteryLevel';
import {useFilterStore} from './src/store/useFilterStore';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/StackNavigator';
import AppWrapper from './src/components/appWrapper';
import {OfflineBanner} from './src/components/offlineBanner';
import {linking} from './src/navigation/linking';
console.log('🚀 ~ NativeBatteryLevel:', NativeBatteryLevel);
import messaging from '@react-native-firebase/messaging';

const EMPTY = '<empty>';

const filterOptions = [
  'Open',
  'Closed',
  'Standby',
  'In process',
  'Complete',
  'Cancle',
];

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  const {status, setStatus} = useFilterStore();

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const url = remoteMessage?.data?.deepLink;
      Alert.alert('url', url);
      console.log('\n\n 🚀 ~ App ~ url:', url);
      if (url) Linking.openURL(url);
    });

    const unsubscribeNoti = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const url = remoteMessage?.data?.deepLink;
        Alert.alert('url', url);
        if (url) Linking.openURL(url);
      },
    );

    // App quit → opened by notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        const url = remoteMessage?.data?.deepLink;
        Alert.alert('url', url);
        if (url) Linking.openURL(url);
      });

    return () => {
      unsubscribe;
      unsubscribeNoti;
    };
  }, []);

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({url}) => {
      console.log('Deep link opened:', url);
    });

    Linking.getInitialURL().then(url => {
      if (url) console.log('App opened from:', url);
    });

    return () => sub.remove();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log('🚀 ~ requestUserPermission ~ enabled:', enabled);

    if (enabled) {
      const fcm_token = await messaging().getToken();
      Alert.alert('Token', fcm_token);
      console.log('\n\n 🚀 ~ requestUserPermission ~ fcm_token:', fcm_token);
      console.log('Authorization status:', authStatus);
    }
  }

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  function getBatteryLevel() {
    const level = NativeBatteryLevel.getBatteryLevel();
    Alert.alert(`Your phone's battery level is ${level}`);
  }

  return (
    <AppWrapper>
      <NavigationContainer linking={linking}>
        <OfflineBanner />
        <StackNavigator />
      </NavigationContainer>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  buttonStyle: {
    marginVertical: 12,
  },
  textStyle: {
    fontSize: 20,
    marginVertical: 1,
  },
});

export default App;
