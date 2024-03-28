import React from "react";

type Props = {
  title: string;
  number: number;
};

const CardStat = ({ title, number }: Props) => {
  return (
    <div className="px-10 py-5 rounded-md text-center bg-green-100">
      <h2 className="text-2xl text-gray-600 font-medium">{title}</h2>
      <p className="text-5xl">{number}</p>
    </div>
  );
};

export default CardStat;
