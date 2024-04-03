import { create } from "zustand";
import { VisitorAPIResponse } from "../types";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
  allVisitorsToday: VisitorAPIResponse;
  setAllVisitorsToday: (visitors: VisitorAPIResponse) => void;
  allVisitorsInToday: VisitorAPIResponse;
  setAllVisitorsInToday: () => void;
  allVisitorsOutToday: VisitorAPIResponse;
  setAllVisitorsOutToday: () => void;
};

const useVisitorStore = create<VisitorStore>()((set) => ({
  formModalIsOpen: false,
  allVisitorsToday: { totalResults: 0, results: [] },
  allVisitorsOutToday: { totalResults: 0, results: [] },
  allVisitorsInToday: { totalResults: 0, results: [] },

  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },

  setAllVisitorsToday: (visitors: VisitorAPIResponse) => {
    set({ allVisitorsToday: visitors });
  },
  setAllVisitorsInToday: () => {},
  setAllVisitorsOutToday: () => {},
}));

export default useVisitorStore;
