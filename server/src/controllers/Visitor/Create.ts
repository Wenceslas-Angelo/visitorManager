import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const Create = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    ...req.body,
  });
  newVisitor
    .save()
    .then(async (visitor) => {
      const totalResults = await Visitor.find().countDocuments();
      return res.status(201).json({ totalResults, result: visitor });
    })
    .catch((error) => res.status(400).json({ error }));
};
