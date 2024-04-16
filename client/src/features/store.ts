import { create } from "zustand";

type FormModalStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
};

export const useFormModalStore = create<FormModalStore>()((set) => ({
  formModalIsOpen: false,

  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },
}));

type CurrentPageStore = {
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
};

export const useCurrentPageStore = create<CurrentPageStore>()((set) => ({
  currentPage: 0,
  previousPage: () => {
    return set((state) => ({ currentPage: state.currentPage - 1 }));
  },
  nextPage: () => {
    return set((state) => ({ currentPage: state.currentPage + 1 }));
  },
}));
