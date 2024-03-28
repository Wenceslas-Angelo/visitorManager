import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const readTodayVisitors = async (
  req: Request,
  res: Response,
  filterOptions: { [key: string]: any }
) => {
  try {
    const pageString: string | undefined = req.query.page as string | undefined;
    const page = pageString ? parseInt(pageString) : 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalResults = await Visitor.find({
      ...filterOptions,
      ...{
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    }).countDocuments();

    const visitors = await Visitor.find({
      ...filterOptions,
      ...{
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    })
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalPages = Math.ceil(totalResults / limit);

    res.status(200).json({
      totalResults,
      totalPages,
      results: visitors,
      page,
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ReadAllToday = async (req: Request, res: Response) => {
  await readTodayVisitors(req, res, {});
};

export const ReadAllInToday = async (req: Request, res: Response) => {
  await readTodayVisitors(req, res, { endDateTime: { $exists: false } });
};

export const ReadAllOutToday = async (req: Request, res: Response) => {
  await readTodayVisitors(req, res, { endDateTime: { $exists: true } });
};

export const ReadOne = (req: Request, res: Response) => {
  Visitor.findOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json(visitor))
    .catch((error) => res.status(400).json({ error }));
};
