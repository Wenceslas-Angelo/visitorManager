import { create } from "zustand";
import { visitorApi } from "../API/visitor";
import { VisitorType } from "../types";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
  visitors: {
    totalPages: number;
    totalResults: number;
    results: VisitorType[];
  };
  createVisitor: (visitorData: VisitorType, token: string) => void;
  readAllVisitors: (token: string, page?: number) => void;
};

const useVisitorStore = create<VisitorStore>()((set) => ({
  formModalIsOpen: false,
  visitors: { totalPages: 0, totalResults: 0, results: [] },
  setFormModalIsOpen: () =>
    set((state) => ({ formModalIsOpen: !state.formModalIsOpen })),
  createVisitor: async (visitorData: VisitorType, token: string) => {
    try {
      const newVisitor = await visitorApi.create(visitorData, token);
      set((state) => ({
        visitors: {
          totalPages: state.visitors.totalPages,
          totalResults: state.visitors.totalResults + 1,
          results: [...state.visitors.results, newVisitor],
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
  readAllVisitors: async (token: string, page: number = 1) => {
    try {
      const allVisitors = await visitorApi.readAll(token, page);
      set({ visitors: allVisitors });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useVisitorStore;
