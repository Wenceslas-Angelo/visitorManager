import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const Create = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    ...req.body,
  });
  newVisitor
    .save()
    .then(async (visitor) => {
      const limit = 10;
      const totalResults = await Visitor.find({
        endDateTime: { $exists: false },
      }).countDocuments();
      const totalPages = Math.ceil(totalResults / limit);
      return res
        .status(201)
        .json({ totalPages, totalResults, result: visitor });
    })
    .catch((error) => res.status(400).json({ error }));
};
