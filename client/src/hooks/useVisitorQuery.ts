import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { visitorApi } from "../API/visitor";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorType } from "../types";

export const useCreateVisitor = () => {
  const { createVisitor, setFormModalIsOpen } = useVisitorStore();
  const createVisitorMutation = useMutation({
    mutationFn: ({
      visitorData,
      token,
    }: {
      visitorData: VisitorType;
      token: string;
    }) => visitorApi.create(visitorData, token),
    onSuccess: (data) => {
      createVisitor(data);
      setFormModalIsOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return createVisitorMutation;
};
