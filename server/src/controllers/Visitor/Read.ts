import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const ReadAllToday = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      0,
      0,
      0
    );
    const query = {
      startDateTime: { $gte: startOfDay, $lt: endOfDay },
    };
    const totalResults = await Visitor.find(query).countDocuments();
    const visitors = await Visitor.find(query).sort({ _id: -1 });

    res.status(200).json({
      totalResults,
      results: visitors,
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ReadOne = (req: Request, res: Response) => {
  Visitor.findOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json(visitor))
    .catch((error) => res.status(400).json({ error }));
};
