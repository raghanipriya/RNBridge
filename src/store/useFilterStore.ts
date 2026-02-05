import {create} from 'zustand';

type FilterState = {
  status: string[];
  setStatus: (status: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>(set => ({
  status: [],

  setStatus: value =>
    set(state => ({
      status: state.status.includes(value)
        ? state.status.filter(s => s !== value)
        : [...state.status, value],
    })),

  clearFilters: () => set({status: []}),
}));
