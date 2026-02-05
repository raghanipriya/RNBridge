import {LinkingOptions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import {Linking} from 'react-native';

const NAVIGATION_IDS = ['form', 'redux', 'zustand'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'form') {
    return 'rnbridge://form';
  }
  if (navigationId === 'zustand') {
    return 'rnbridge://zustand';
  }
  if (navigationId === 'redux') {
    return 'rnbridge://redux';
  }
  return null;
}

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['rnbridge://'],
  config: {
    screens: {
      Form: 'form',
      ZustandEmp: 'zustand',
      ReduxEmp: 'redux',
      TurboModuleEmp: 'turbo',
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    console.log('\n\n 🚀 ~ message:', message);
    const deeplinkURL = message?.data?.deepLink;
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage: any) => {
        console.log(
          '\n\n 🚀 ~ remoteMessage?.data?.deepLink:',
          remoteMessage?.data?.deepLink,
        );
        console.log('\n\n 🚀 ~ remoteMessage in linking:', remoteMessage);
        // const url = buildDeepLinkFromNotificationData(remoteMessage.data);

        listener(remoteMessage?.data?.deepLink);
      },
    );

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
