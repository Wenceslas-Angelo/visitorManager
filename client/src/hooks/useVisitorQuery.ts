import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { visitorApi } from "../API/visitor";
import { useAppDispatch } from "../app/hooks";
import { useFormModalStore } from "../features/store";
import {
  addVisitor,
  checkOutVisitor,
  deleteVisitor,
  updateVisitor,
} from "../features/visitor/visitorSlice";
import { ReadAllVisitorsResponse, VisitorType } from "../types";

export const useCreateVisitor = () => {
  const { setFormModalIsOpen } = useFormModalStore();
  const dispatch = useAppDispatch();
  const createVisitorMutation = useMutation({
    mutationFn: ({
      visitorData,
      token,
    }: {
      visitorData: VisitorType;
      token: string;
    }) => visitorApi.create(visitorData, token),
    onSuccess: (visitor) => {
      dispatch(addVisitor(visitor));
      setFormModalIsOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return createVisitorMutation;
};

export const useReadAllVisitors = (token: string, page: number) => {
  const visitors = useQuery<ReadAllVisitorsResponse>({
    queryKey: ["allVisitor", page],
    queryFn: () => visitorApi.readAllVisitors(token, page),
  });
  return visitors;
};

export const useReadAllTodayVisitors = (token: string) => {
  const visitors = useQuery<ReadAllVisitorsResponse>({
    queryKey: ["allVisitorToday"],
    queryFn: () => visitorApi.readAllVisitorsToday(token),
  });
  return visitors;
};

export const useReadOneVisitor = (token: string, idVisitor: string) => {
  const visitor = useQuery<VisitorType>({
    queryKey: ["oneVisitor"],
    queryFn: () => visitorApi.readOne(token, idVisitor),
  });
  return visitor;
};

export const useCheckOutVisitor = () => {
  const dispatch = useAppDispatch();
  const checkOutVisitorMutation = useMutation({
    mutationFn: ({ token, idVisitor }: { token: string; idVisitor: string }) =>
      visitorApi.checkOut(token, idVisitor),
    onSuccess: (data) => {
      dispatch(checkOutVisitor(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return checkOutVisitorMutation;
};

export const useDeleteVisitor = () => {
  const dispatch = useAppDispatch();
  const deleteVisitorMutation = useMutation({
    mutationFn: ({ token, idVisitor }: { token: string; idVisitor: string }) =>
      visitorApi.delete(token, idVisitor),
    onSuccess: (data) => {
      dispatch(deleteVisitor(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return deleteVisitorMutation;
};

export const useUpdateVisitor = () => {
  const { setFormModalIsOpen, setIdVisitorUpdate } = useFormModalStore();
  const dispatch = useAppDispatch();
  const updateVisitorMutation = useMutation({
    mutationFn: ({
      visitorData,
      token,
      visitorId,
    }: {
      visitorData: VisitorType;
      token: string;
      visitorId: string;
    }) => visitorApi.update(visitorData, token, visitorId),
    onSuccess: (user) => {
      dispatch(updateVisitor(user));
      setIdVisitorUpdate("");
      setFormModalIsOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return updateVisitorMutation;
};

export const useSearchVisitors = (
  token: string,
  searchQuery: string,
  purposeQuery: string,
  date: string
) => {
  const visitors = useQuery<ReadAllVisitorsResponse>({
    queryKey: ["searchVisitor", searchQuery, purposeQuery, date],
    queryFn: () => visitorApi.search(token, searchQuery, purposeQuery, date),
  });
  return visitors;
};
