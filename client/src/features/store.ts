import { create } from "zustand";

type Store = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
};

export const useFormModalStore = create<Store>()((set) => ({
  formModalIsOpen: false,
  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },
}));
