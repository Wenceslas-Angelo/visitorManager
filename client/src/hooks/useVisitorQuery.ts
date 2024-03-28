import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { visitorApi } from "../API/visitor";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorAPIResponse, VisitorType } from "../types";

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

const useReadAllVisitor = (
  queryKey: string,
  queryFn: (token: string, pageParam: unknown) => Promise<VisitorAPIResponse>,
  token: string
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<VisitorAPIResponse>({
      queryKey: [queryKey],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => queryFn(token, pageParam),
      getNextPageParam: (lastPage) => {
        lastPage.page = lastPage.page + 1;
        return lastPage.page;
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useReadAllTodayVisitor = (token: string) =>
  useReadAllVisitor("visitorToday", visitorApi.readAllToday, token);

export const useReadAllTodayVisitorIn = (token: string) =>
  useReadAllVisitor("visitorTodayIn", visitorApi.readAllInToday, token);

export const useReadAllTodayVisitorOut = (token: string) =>
  useReadAllVisitor("visitorTodayOut", visitorApi.readAllOutToday, token);
