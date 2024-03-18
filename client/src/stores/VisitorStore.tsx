import { create } from "zustand";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
};

const useVisitorStore = create<VisitorStore>()((set) => ({
  formModalIsOpen: false,
  setFormModalIsOpen: () =>
    set((state) => ({ formModalIsOpen: !state.formModalIsOpen })),
}));

export default useVisitorStore;
