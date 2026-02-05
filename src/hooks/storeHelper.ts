import {useShallow} from 'zustand/react/shallow';

/**
 * Creates a typed selector hook for picking multiple keys from a Zustand store
 */
export function createSelectors<TStore extends object>(
  useStore: <U>(selector: (state: TStore) => U) => U,
) {
  return function useSelectors<K extends keyof TStore>(
    keys: K[],
  ): Pick<TStore, K> {
    return useStore(
      useShallow((state: TStore) => {
        const slice = {} as Pick<TStore, K>;
        keys.forEach(key => {
          slice[key] = state[key];
        });
        return slice;
      }),
    );
  };
}
