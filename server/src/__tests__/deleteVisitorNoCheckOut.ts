import mongoose from "mongoose";
import Visitor from "../models/Visitor";

mongoose.connect("mongodb://localhost:27017/visitorManager", {
  family: 4,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    await Visitor.deleteMany({ endDateTime: { $exists: false } });
    console.log("Visiteurs sans endDateTime supprimés avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression des visiteurs:", error);
  } finally {
    mongoose.connection.close();
  }
});
