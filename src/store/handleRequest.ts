import {Alert} from 'react-native';
import {useNetworkStore} from './useNetworkStore';
import {logAppError} from '../utils/crashlyticsLogger';

export type AsyncExecutor = <T>(
  key: string,
  apiCall: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void, // 👈 NEW
) => Promise<void>;

export const createAsyncExecutor = (set: any): AsyncExecutor => {
  return async (key, apiCall, onSuccess, onError) => {
    const isConnected = useNetworkStore.getState().isConnected;
    if (!isConnected) {
      Alert.alert('No Internet', 'Please connect to the internet.');
      return;
    }

    try {
      set((s: any) => {
        const newLoading = {...s.loadingMap, [key]: true};
        return {
          loadingMap: newLoading,
          isAnyLoading: Object.values(newLoading).some(Boolean),
          errorMap: {...s.errorMap, [key]: null},
        };
      });

      const data = await apiCall();

      set((s: any) => {
        const newLoading = {...s.loadingMap, [key]: false};
        return {
          loadingMap: newLoading,
          isAnyLoading: Object.values(newLoading).some(Boolean),
        };
      });

      onSuccess?.(data);
    } catch (e: any) {
      logAppError({
        functionName: 'createAsyncExecutor',
        error: e,
        extraInfo: {key},
      });

      set((s: any) => {
        const newLoading = {...s.loadingMap, [key]: false};
        return {
          loadingMap: newLoading,
          isAnyLoading: Object.values(newLoading).some(Boolean),
          errorMap: {...s.errorMap, [key]: e?.message || 'Error'},
        };
      });

      onError?.(e);
    }
  };
};
