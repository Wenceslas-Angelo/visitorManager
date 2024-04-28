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
