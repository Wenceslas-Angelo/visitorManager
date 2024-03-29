import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { visitorApi } from "../API/visitor";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorAPIResponse, VisitorType } from "../types";

export const useCreateVisitor = () => {
  const { setFormModalIsOpen } = useVisitorStore();
  const createVisitorMutation = useMutation({
    mutationFn: ({
      visitorData,
      token,
    }: {
      visitorData: VisitorType;
      token: string;
    }) => visitorApi.create(visitorData, token),
    onSuccess: () => {
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

export const useCheckOutVisitor = () => {
  const checkOutVisitorMutation = useMutation({
    mutationFn: ({ token, idVisitor }: { token: string; idVisitor: string }) =>
      visitorApi.checkOut(token, idVisitor),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return checkOutVisitorMutation;
};
