import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const DeleteOne = (req: Request, res: Response) => {
  Visitor.deleteOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};
