import {create} from 'zustand';

import {
  SpareReplacementItem,
  ProductCoreDetailPayload,
  CountryResp,
} from '../types/spareTypes';
import {apiGet} from './apiMethods';
import {apiRoutes} from './routes';
import {createAsyncExecutor} from './handleRequest';
import {createSelectors} from '../hooks/storeHelper';

type SpareState = {
  country: CountryResp[];

  getCountry: (payload: string) => Promise<void>;

  loadingMap: Record<string, boolean>;
  errorMap: Record<string, string | null>;
  isAnyLoading: boolean;
};

export const useCountryStore = create<SpareState>((set, get) => {
  const exec = createAsyncExecutor(set); // ✅ ONLY AVAILABLE INSIDE THIS BLOCK

  return {
    country: [],

    loadingMap: {},
    errorMap: {},

    isAnyLoading: false,

    // 1️⃣ GET
    getCountry: async (payload: string) =>
      exec(
        'getCountry',
        () => apiGet<CountryResp[]>(`${apiRoutes.countries}?${payload}`),
        (data: any) => {
          return set({country: data});
        },
      ),
  };
});

export const useCountryStoreSelectors = createSelectors(useCountryStore);
