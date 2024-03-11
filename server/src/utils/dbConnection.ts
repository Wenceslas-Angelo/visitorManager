import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      family: 4,
    })
    .then(() => console.log("DB IS CONNECTED SUCCESSFULLY"))
    .catch((error) => console.log("CONNECTION ERROR WITH:", error));
};

export default dbConnection;
