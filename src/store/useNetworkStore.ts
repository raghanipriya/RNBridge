import {create} from 'zustand';

type NetworkState = {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
};

export const useNetworkStore = create<NetworkState>(set => ({
  isConnected: true,
  setIsConnected: status => set({isConnected: status}),
}));
