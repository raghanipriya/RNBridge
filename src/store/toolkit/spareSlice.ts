import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteSpareResponse,
  SpareChildItem,
  addSpareResponseItem,
  SpareReplacementItem,
  ProductCoreDetailPayload,
} from '../../types/spareTypes';
import {apiDelete, apiGet, apiPost} from '../apiMethods';
import {apiRoutes} from '../routes';

// Define State Shape
interface SpareState {
  spareItems: SpareReplacementItem[];
  itemDetails: SpareChildItem | null;
  loadingMap: Record<string, boolean>;
  errorMap: Record<string, string | null>;
  lastListQuery: string | null;
}

const initialState: SpareState = {
  spareItems: [],
  itemDetails: null,
  loadingMap: {},
  errorMap: {},
  lastListQuery: null,
};

// --- Thunks ---

export const getSpare = createAsyncThunk(
  'spare/getSpare',
  async (payload: string, {rejectWithValue}) => {
    try {
      const data = await apiGet<ProductCoreDetailPayload>(
        `${apiRoutes.getSpare}?${payload}`,
      );
      return {data, query: payload};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSpareByID = createAsyncThunk(
  'spare/getSpareByID',
  async (
    {SERVICE_CALL_ID, id}: {SERVICE_CALL_ID: string; id: string},
    {rejectWithValue},
  ) => {
    try {
      const data = await apiGet<SpareChildItem>(
        `${apiRoutes.getByID}?service_call_id=${SERVICE_CALL_ID}&row_id=${id}`,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addUpdateSpare = createAsyncThunk(
  'spare/addUpdateSpare',
  async (payload: Partial<any>, {dispatch, getState, rejectWithValue}) => {
    try {
      const response = await apiPost<addSpareResponseItem[]>(
        apiRoutes.addSpare,
        payload,
      );

      // Refresh Logic from Zustand
      const state = getState() as {spare: SpareState}; // Assumes root reducer key is 'spare'
      const lastQuery = state.spare.lastListQuery;
      if (lastQuery) {
        dispatch(getSpare(lastQuery));
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteSpare = createAsyncThunk(
  'spare/deleteSpare',
  async (
    {SERVICE_CALL_ID, id}: {SERVICE_CALL_ID: string; id: string},
    {dispatch, getState, rejectWithValue},
  ) => {
    try {
      const response = await apiDelete<DeleteSpareResponse>(
        `${apiRoutes.deleteSpare}?service_call=${SERVICE_CALL_ID}&row_id=${id}`,
      );

      // Refresh Logic from Zustand
      const state = getState() as {spare: SpareState};
      const lastQuery = state.spare.lastListQuery;
      if (lastQuery) {
        dispatch(getSpare(lastQuery));
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// --- Slice ---

const spareSlice = createSlice({
  name: 'spare',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getSpare
    builder.addCase(getSpare.pending, state => {
      state.loadingMap['getSpare'] = true;
      state.errorMap['getSpare'] = null;
    });
    builder.addCase(getSpare.fulfilled, (state, action) => {
      state.loadingMap['getSpare'] = false;
      state.spareItems = action.payload.data.spare_replacement;
      state.lastListQuery = action.payload.query;
    });
    builder.addCase(getSpare.rejected, (state, action) => {
      state.loadingMap['getSpare'] = false;
      state.errorMap['getSpare'] = action.payload as string;
    });

    // getSpareByID
    builder.addCase(getSpareByID.pending, state => {
      state.loadingMap['getSpareByID'] = true;
    });
    builder.addCase(getSpareByID.fulfilled, (state, action) => {
      state.loadingMap['getSpareByID'] = false;
      state.itemDetails = action.payload;
    });
    builder.addCase(getSpareByID.rejected, (state, action) => {
      state.loadingMap['getSpareByID'] = false;
      state.errorMap['getSpareByID'] = action.payload as string;
    });

    // addUpdateSpare
    builder.addCase(addUpdateSpare.pending, state => {
      state.loadingMap['addUpdateSpare'] = true;
    });
    builder.addCase(addUpdateSpare.fulfilled, state => {
      state.loadingMap['addUpdateSpare'] = false;
    });
    builder.addCase(addUpdateSpare.rejected, (state, action) => {
      state.loadingMap['addUpdateSpare'] = false;
      state.errorMap['addUpdateSpare'] = action.payload as string;
    });

    // deleteSpare
    builder.addCase(deleteSpare.pending, state => {
      state.loadingMap['deleteSpare'] = true;
    });
    builder.addCase(deleteSpare.fulfilled, state => {
      state.loadingMap['deleteSpare'] = false;
    });
    builder.addCase(deleteSpare.rejected, (state, action) => {
      state.loadingMap['deleteSpare'] = false;
      state.errorMap['deleteSpare'] = action.payload as string;
    });
  },
});

export default spareSlice.reducer;
