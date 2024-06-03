import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { family: 4 });
    console.log("DB IS CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("CONNECTION ERROR WITH:", error);
  }
};

export default dbConnection;
