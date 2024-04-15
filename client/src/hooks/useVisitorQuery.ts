import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { visitorApi } from "../API/visitor";
import { useAppDispatch } from "../app/hooks";
import { useFormModalStore } from "../features/store";
import { addVisitor, checkOutVisitor } from "../features/visitor/visitorSlice";
import { VisitorAPIResponse, VisitorType } from "../types";

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
    onSuccess: (user) => {
      dispatch(addVisitor(user));
      setFormModalIsOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return createVisitorMutation;
};

export const useReadAllVisitorToday = (token: string) => {
  const visitorToday = useQuery<VisitorAPIResponse>({
    queryKey: ["allVisitorToday"],
    queryFn: () => visitorApi.readAllToday(token),
  });
  return visitorToday;
};

export const useReadAllVisitors = (token: string, page: number) => {
  const visitors = useQuery<VisitorAPIResponse>({
    queryKey: ["allVisitor"],
    queryFn: () => visitorApi.readAllVisitors(token, page),
  });
  return visitors;
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
