import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const UpdateOne = async (req: Request, res: Response) => {
  try {
    const newVisitor = new Visitor({
      _id: req.params.id,
      ...req.body,
    });

    const updatedVisitor = await Visitor.updateOne(
      { _id: req.params.id },
      newVisitor
    );

    if (updatedVisitor.modifiedCount === 0) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    return res.status(200).json({ visitor: newVisitor });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
