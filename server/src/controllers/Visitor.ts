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

const getAll = (req: Request, res: Response) => {
  Visitor.find().then((visitors) => res.status(200).json({ visitors }));
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
};

export default VisitorCtrl;
