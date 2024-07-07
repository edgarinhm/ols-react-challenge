/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { ParseLocalStorageValue } from "common/functions/local-storage";
import { LocalStorageModel } from "common/models/local-storage-model";
import { create } from "zustand";

export type SharedStorageModel = LocalStorageModel & {
  updateStorage: <
    TKey extends keyof LocalStorageModel,
    TValue extends LocalStorageModel[TKey] | null,
  >(
    key: TKey,
    value: TValue
  ) => void;
  initializeItem: <
    TKey extends keyof LocalStorageModel,
    TValue extends LocalStorageModel[TKey] | null,
  >(
    key: TKey,
    defaultValue: TValue
  ) => void;
  removeItem: <TKey extends keyof LocalStorageModel>(key: TKey) => void;
  clearStorage: () => void;
};

const clearState = (state: SharedStorageModel) => ({
  // keep functions initialized after clear
  updateStorage: state.updateStorage,
  initializeItem: state.initializeItem,
  removeItem: state.removeItem,
  clearStorage: state.clearStorage,
});

const updateLocalStorage = <
  TKey extends keyof LocalStorageModel,
  TValue extends LocalStorageModel[TKey],
>(
  key: TKey,
  value: TValue
) => {
  value === null || value === undefined
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value));
};

const getStateFromLocalStorage = (): LocalStorageModel => {
  const initialState = {} as LocalStorageModel;

  Object.values(LocalStorageKeys).forEach((key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      initialState[key] = ParseLocalStorageValue(storedValue);
    }
  });
  return initialState;
};

const addLocalStorageEventListener = (
  set: (
    partial:
      | SharedStorageModel
      | Partial<SharedStorageModel>
      | ((state: SharedStorageModel) => SharedStorageModel | Partial<SharedStorageModel>),
    replace?: boolean
  ) => void,
  get: () => SharedStorageModel
) => {
  // NOTE: this should NOT be moved to an inline/anonymous function, it must remain a constant
  // doing so will cause memory issues and allow the listener to be registered multiple times
  const storageListener = (event: StorageEvent) => {
    const key = event.key;
    const newValue = event.newValue;

    if (key === null) {
      // local storage was cleared
      set((state) => clearState(state), true);
    } else if (Object.values(LocalStorageKeys).includes(key as LocalStorageKeys)) {
      const currentValue = get()[key as keyof LocalStorageModel];
      if (currentValue !== (newValue as LocalStorageModel)) {
        set({ [key]: ParseLocalStorageValue(newValue) });
      }
    }
  };

  addEventListener("storage", storageListener);
};

export const useSharedStorage = create<SharedStorageModel>()((set, get) => {
  const initialState = getStateFromLocalStorage();

  addLocalStorageEventListener(set, get);

  return {
    ...initialState,
    updateStorage: (key: any, value: any) => {
      updateLocalStorage(key, value);
      set(() => ({ [key]: value }));
    },
    initializeItem: (key: string | number, value: any) => {
      const currentValue = get()[key as keyof LocalStorageModel];
      if (!currentValue) {
        updateLocalStorage(key as keyof LocalStorageModel, value);
        set(() => ({ [key]: value }));
      }
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
      set(() => ({ [key]: undefined }));
    },
    clearStorage: () => {
      localStorage.clear();
      set((state: any) => clearState(state), true);
    },
  };
});
