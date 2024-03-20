import { Request, Response } from "express";
import Visitor from "../models/Visitor";

const create = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    ...req.body,
  });
  newVisitor
    .save()
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const getAll = async (req: Request, res: Response) => {
  try {
    const pageString: string | undefined = req.query.page as string | undefined;
    const page = pageString ? parseInt(pageString) : 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalResults = await Visitor.countDocuments();
    const visitors = await Visitor.find().skip(startIndex).limit(limit);
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

const getActiveVisitor = (req: Request, res: Response) => {
  Visitor.find({ endDateTime: { $exists: false } })
    .then((visitors) => res.status(200).json({ visitors }))
    .catch((error) => res.status(400).json({ error }));
};

const getOne = (req: Request, res: Response) => {
  Visitor.findOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const updateEndDateTime = (req: Request, res: Response) => {
  Visitor.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { endDateTime: new Date() } },
    { new: true }
  )
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const updateVisitor = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    _id: req.params.id,
    ...req.body,
  });
  Visitor.updateOne({ _id: req.params.id }, newVisitor)
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const deleteOne = (req: Request, res: Response) => {
  Visitor.deleteOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const VisitorCtrl = {
  create,
  getAll,
  getOne,
  updateVisitor,
  deleteOne,
  updateEndDateTime,
  getActiveVisitor,
};

export default VisitorCtrl;
