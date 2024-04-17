import { Request, Response } from "express";
import Visitor from "../../models/Visitor";

export const DeleteOne = async (req: Request, res: Response) => {
  try {
    const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!deletedVisitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    const totalResults = await Visitor.countDocuments();
    return res.status(200).json({ totalResults, result: deletedVisitor });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const DeleteAll = (req: Request, res: Response) => {
  Visitor.deleteMany({})
    .then(async (visitor) => {
      const totalResults = await Visitor.find().countDocuments();
      return res.status(200).json({ totalResults, result: visitor });
    })
    .catch((error) => res.status(400).json({ error }));
};
