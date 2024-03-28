import { create } from "zustand";
import { CreateVisitorAPIResponse, VisitorAPIResponse } from "../types";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
  visitors: VisitorAPIResponse;
  createVisitor: (visitorData: CreateVisitorAPIResponse) => void;
  readAllVisitors: (visitors: VisitorAPIResponse) => void;
  // updateActiveVisitor: (token: string, visitorId: string) => void;
};

const useVisitorStore = create<VisitorStore>()((set) => ({
  formModalIsOpen: false,
  visitors: { totalPages: 0, totalResults: 0, results: [], page: 1 },
  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },
  createVisitor: (newVisitor: CreateVisitorAPIResponse) => {
    set((state) => ({
      visitors: {
        totalPages: newVisitor.totalPages,
        totalResults: newVisitor.totalResults,
        results: [...state.visitors.results, newVisitor.result],
        page: state.visitors.page,
      },
    }));
  },

  readAllVisitors: (visitors: VisitorAPIResponse) => set({ visitors }),

  // updateActiveVisitor: async (token: string, visitorId: string) => {
  //   try {
  //     await visitorApi.updateActiveVisitor(token, visitorId);
  //     set((state) => ({
  //       visitors: {
  //         totalPages: state.visitors.totalPages,
  //         totalResults: state.visitors.totalResults + 1,
  //         results: state.visitors.results.filter(
  //           (visitor) => visitor._id !== visitorId
  //         ),
  //         page: state.visitors.page,
  //       },
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
}));

export default useVisitorStore;
