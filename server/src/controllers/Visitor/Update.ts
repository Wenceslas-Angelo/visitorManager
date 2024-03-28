import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const UpdateOne = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    _id: req.params.id,
    ...req.body,
  });
  Visitor.updateOne({ _id: req.params.id }, newVisitor)
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

export const CheckOut = (req: Request, res: Response) => {
  Visitor.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { endDateTime: new Date() } },
    { new: true }
  )
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};
