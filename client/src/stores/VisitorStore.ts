import { create } from "zustand";
import { VisitorAPIResponse } from "../types";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
  visitors: VisitorAPIResponse;
};

const useVisitorStore = create<VisitorStore>()((set) => ({
  formModalIsOpen: false,
  visitors: { totalResults: 0, results: [] },

  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },
}));

export default useVisitorStore;
