import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const Search = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const filter: any = {};
    for (const key in req.query) {
      if (key !== "page") {
        filter[key] = req.query[key];
      }
    }

    const visitors = await Visitor.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalVisitors = await Visitor.countDocuments(filter);
    const totalPages = Math.ceil(totalVisitors / pageSize);

    res.status(200).json({
      totalResults: totalVisitors,
      results: visitors,
      totalPages,
      currentPage: page,
      nextPage: page + 1,
    });
  } catch (error) {
    console.error("Erreur lors de la recherche des visiteurs :", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
