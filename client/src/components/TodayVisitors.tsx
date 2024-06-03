import React from "react";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import Container from "../utils/Container";
import FormVisitor from "./FormVisitor";
import ModaleDelete from "./ModaleDelete";
import VisitorTable from "./VisitorTable";
import { useVisitors } from "../hooks/useVisitors";

type Props = {
  variant: "all" | "in" | "out";
};

const TodayVisitors = ({ variant }: Props) => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const { allVisitorToday } = useVisitors("today");

  const filteredVisitors = allVisitorToday.visitors.filter((visitor) => {
    if (variant === "in") return !visitor.endDateTime;
    if (variant === "out") return visitor.endDateTime;
    return true;
  });

  return (
    <Container>
      <div className="w-full">
        <div className="w-full mt-10">
          <VisitorTable
            visitorsData={filteredVisitors}
            visitorActive={variant === "in"}
          />
        </div>
        {formModalIsOpen && <FormVisitor />}
        {deleteModalIsOpen && <ModaleDelete />}
      </div>
    </Container>
  );
};

export default TodayVisitors;
