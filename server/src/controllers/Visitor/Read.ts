import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const ReadAllToday = async (req: Request, res: Response) => {
  try {
    const totalResults = await Visitor.find().countDocuments();
    const visitors = await Visitor.find().sort({ _id: -1 });

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
