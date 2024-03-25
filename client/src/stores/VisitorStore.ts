import { create } from "zustand";
import { visitorApi } from "../API/visitor";
import { CreateVisitorAPIResponse, VisitorAPIResponse } from "../types";

type VisitorStore = {
  formModalIsOpen: boolean;
  setFormModalIsOpen: () => void;
  visitors: VisitorAPIResponse;
  createVisitor: (visitorData: CreateVisitorAPIResponse) => void;
  readAllVisitors: (token: string, page?: number) => void;
  readAllActiveVisitors: (token: string, page?: number) => void;
  updateActiveVisitor: (token: string, visitorId: string) => void;
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

  readAllVisitors: async (token: string, page: number = 1) => {
    try {
      const allVisitors = await visitorApi.readAll(token, page);
      set({ visitors: allVisitors });
    } catch (error) {
      console.error(error);
    }
  },

  readAllActiveVisitors: async (token: string, page: number = 1) => {
    try {
      const allVisitors = await visitorApi.readAllActive(token, page);
      set({ visitors: allVisitors });
    } catch (error) {
      console.error(error);
    }
  },

  updateActiveVisitor: async (token: string, visitorId: string) => {
    try {
      await visitorApi.updateActiveVisitor(token, visitorId);
      set((state) => ({
        visitors: {
          totalPages: state.visitors.totalPages,
          totalResults: state.visitors.totalResults + 1,
          results: state.visitors.results.filter(
            (visitor) => visitor._id !== visitorId
          ),
          page: state.visitors.page,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useVisitorStore;
