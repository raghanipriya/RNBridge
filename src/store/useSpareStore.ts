import {create} from 'zustand';

import {
  DeleteSpareResponse,
  SpareChildItem,
  addSpareResponseItem,
  ProductCoreDetailSchema,
  SpareReplacementItemSchema,
  SpareReplacementItems,
} from '../types/spareTypes';
import {apiDelete, apiGet, apiPost} from './apiMethods';
import {apiRoutes} from './routes';
import {createAsyncExecutor} from './handleRequest';
import {createSelectors} from '../hooks/storeHelper';
import z from 'zod';

type SpareState = {
  spareItems: SpareReplacementItems[];
  itemDetails: SpareChildItem | null;

  getSpare: (payload: string) => Promise<void>;
  getSpareByID: (SERVICE_CALL_ID: string, id: string) => Promise<void>;
  addUpdateSpare: (payload: Partial<any>) => Promise<void>;
  deleteSpare: (SERVICE_CALL_ID: string, id: string) => Promise<void>;

  loadingMap: Record<string, boolean>;
  errorMap: Record<string, string | null>;
  lastListQuery: string | null;
  isAnyLoading: boolean;
};

export const useSpareStore = create<SpareState>((set, get) => {
  const exec = createAsyncExecutor(set); // ✅ ONLY AVAILABLE INSIDE THIS BLOCK

  return {
    spareItems: [],
    itemDetails: null,

    loadingMap: {},
    errorMap: {},
    lastListQuery: null,
    isAnyLoading: false,

    // 1️⃣ GET
    getSpare: async (payload: string) =>
      exec(
        'getSpare',
        () =>
          apiGet(`${apiRoutes.getSpare}?${payload}`, {
            responseSchema: ProductCoreDetailSchema,
          }),
        data => {
          return set({
            spareItems: data.spare_replacement,
            lastListQuery: payload,
          });
        },
        e => {
          set({
            spareItems: [], // reset list safely
            lastListQuery: payload,
          });
        },
      ),

    // 2️⃣ ADD
    addUpdateSpare: async payload =>
      exec(
        'addUpdateSpare',
        () => apiPost<addSpareResponseItem[]>(apiRoutes.addSpare, payload),
        () => {
          const query = get().lastListQuery;
          if (query) {
            get().getSpare(query); // 🔁 refresh with same params
          }
        },
      ),

    getSpareByID: async (SERVICE_CALL_ID, id) =>
      exec(
        'getSpareByID',
        () =>
          apiGet<SpareChildItem>(
            `${apiRoutes.getByID}?service_call_id=${SERVICE_CALL_ID}&row_id=${id}`,
          ),
        (data: any) => set({itemDetails: data}),
      ),

    // 4️⃣ DELETE
    deleteSpare: (SERVICE_CALL_ID, id) =>
      exec(
        'deleteSpare',
        () =>
          apiDelete<DeleteSpareResponse>(
            `${
              apiRoutes.deleteSpare
            }?service_call=${SERVICE_CALL_ID}&row_id=${'id'}`,
          ),
        () => {
          const query = get().lastListQuery;
          if (query) {
            get().getSpare(query); // 🔁 refresh with same params
          }
        },
      ),
  };
});

export const useSpareStoreSelectors = createSelectors(useSpareStore);
