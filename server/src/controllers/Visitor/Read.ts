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
    const query: any = {
      startDateTime: { $gte: startOfDay, $lt: endOfDay },
    };

    const totalResults = await Visitor.find(query).countDocuments();
    const visitors = await Visitor.find(query).sort({ _id: -1 });
    res.status(200).json({ totalResults, results: visitors });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    throw error;
  }
};

export const ReadAll = async (res: Response, req: Request) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const visitors = await Visitor.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalVisitors = await Visitor.countDocuments();
    const totalPages = Math.ceil(totalVisitors / pageSize);
    res.status(200).json({
      results: visitors,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des visiteurs :", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const ReadOne = (req: Request, res: Response) => {
  Visitor.findOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json(visitor))
    .catch((error) => res.status(400).json({ error }));
};
