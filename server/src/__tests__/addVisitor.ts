import mongoose from "mongoose";
import Visitor from "../models/Visitor";
import { visitorsData } from "./Mock/visitorData";

mongoose.connect("mongodb://localhost:27017/visitorManager", {
  family: 4,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", async () => {
  console.log("Connected to MongoDB");

  const visitors = [];

  for (const data of visitorsData) {
    visitors.push(
      new Visitor({
        userId: "6618cc88038225798e59b7b2",
        name: data.name,
        firstName: data.firstName,
        purpose: data.purpose,
        visitDate: new Date(),
        nationalId: data.nationalId,
        badgeNumber: data.badgeNumber,
      })
    );
  }

  try {
    await Visitor.insertMany(visitors);
    console.log("visiteurs ajoutés avec succès");
  } catch (error) {
    console.error("Erreur lors de l'ajout des visiteurs:", error);
  } finally {
    mongoose.connection.close();
  }
});
