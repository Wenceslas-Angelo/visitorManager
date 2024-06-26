import { create } from "zustand";

type FormModalStore = {
  formModalIsOpen: boolean;
  idVisitorUpdate: string;
  setFormModalIsOpen: () => void;
  setIdVisitorUpdate: (idVisitor: string) => void;
};

export const useFormModalStore = create<FormModalStore>()((set) => ({
  formModalIsOpen: false,
  idVisitorUpdate: "",
  setFormModalIsOpen: () => {
    return set((state) => ({ formModalIsOpen: !state.formModalIsOpen }));
  },
  setIdVisitorUpdate: (idVisitor: string) => {
    return set({ idVisitorUpdate: idVisitor });
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

type DeleteModalStore = {
  deleteModalIsOpen: boolean;
  idVisitorDeleted: string;
  setDeleteModalIsOpen: () => void;
  setIdVisitorDeleted: (idVisitor: string) => void;
};

export const useDeleteModalStore = create<DeleteModalStore>()((set) => ({
  deleteModalIsOpen: false,
  idVisitorDeleted: "",
  setDeleteModalIsOpen: () => {
    return set((state) => ({ deleteModalIsOpen: !state.deleteModalIsOpen }));
  },
  setIdVisitorDeleted: (idVisitor: string) => {
    return set({ idVisitorDeleted: idVisitor });
  },
}));

type PageStore = {
  page: number;
  setPage: (page: number) => void;
};

export const usePageStore = create<PageStore>()((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  purposeQuery: string;
  setPurposeQuery: (query: string) => void;
  dateQuery: string;
  setDateQuery: (query: string) => void;
  todayQuery: boolean;
  setTodayQuery: (query: boolean) => void;
  inTodayQuery: boolean;
  setInTodayQuery: (query: boolean) => void;
  outTodayQuery: boolean;
  setOutTodayQuery: (query: boolean) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  purposeQuery: "",
  setPurposeQuery: (query) => set({ purposeQuery: query }),
  dateQuery: "",
  setDateQuery: (query) => set({ dateQuery: query }),
  todayQuery: false,
  setTodayQuery: (query) => set({ todayQuery: query }),
  inTodayQuery: false,
  setInTodayQuery: (query) => set({ inTodayQuery: query }),
  outTodayQuery: false,
  setOutTodayQuery: (query) => set({ outTodayQuery: query }),
}));
