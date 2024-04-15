import React from "react";
import Container from "../utils/Container";

const Visiteurs = () => {
  return (
    <Container>
      <div className="flex justify-between w-full py-5">
        <h2>Expected visitors</h2>
        <select>
          <option value="monthly">Monthly</option>
          <option value="monthly">Daily</option>
        </select>
      </div>
    </Container>
  );
};

export default Visiteurs;
