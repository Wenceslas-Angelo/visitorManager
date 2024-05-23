import { Request, Response } from "express";
import moment from "moment";
import Visitor from "../models/Visitor";

const Create = (req: Request, res: Response) => {
  const newVisitor = new Visitor({
    ...req.body,
    startDateTime: new Date(),
  });
  newVisitor
    .save()
    .then(async (visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const ReadAll = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  const purpose = req.query.purpose || "";
  const today = req.query.today === "true" ? true : false;
  const inToday = req.query.inToday === "true" ? true : false;
  const outToday = req.query.outToday === "true" ? true : false;

  const query: { [key: string]: any } = {
    ...(search && {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
      ],
    }),
    ...(purpose && { purpose: { $regex: purpose, $options: "i" } }),
  };

  if (today) {
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();
    query.startDateTime = { $gte: startOfToday, $lt: endOfToday };
  }

  if (inToday) {
    query.endDateTime = { $exists: false };
  }

  if (outToday) {
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();
    query.endDateTime = { $gte: startOfToday, $lt: endOfToday };
  }

  Visitor.find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .then(async (visitors) => {
      const totalVisitors = await Visitor.countDocuments(query);

      res.status(200).json({
        visitors,
        totalVisitors,
        totalPages: Math.ceil(totalVisitors / limit),
        currentPage: page,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error.message,
      })
    );
};

const ReadOne = (req: Request, res: Response) => {
  Visitor.findOne({ _id: req.params.id })
    .then((visitor) => res.status(200).json(visitor))
    .catch((error) => res.status(400).json({ error }));
};

const UpdateOne = (req: Request, res: Response) => {
  Visitor.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const CheckOut = (req: Request, res: Response) => {
  Visitor.findByIdAndUpdate(
    req.params.id,
    { $set: { endDateTime: new Date() } },
    { new: true }
  )
    .then((visitor) => res.status(201).json({ visitor }))
    .catch((error) => res.status(400).json({ error }));
};

const DeleteOne = (req: Request, res: Response) => {
  Visitor.findByIdAndDelete(req.params.id)
    .then((visitor) => res.status(200).json({ visitor }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

const Search = async (req: Request, res: Response) => {
  const filter: any = {};
  for (const key in req.query) {
    if (key !== "page") {
      filter[key] = req.query[key];
    }
  }

  Visitor.find(filter)
    .sort({ _id: -1 })
    .then((visitors) =>
      res.status(200).json({
        visitors,
      })
    )
    .catch((error) => res.status(500).json({ error }));
};

const VisitorCtrl = {
  Create,
  ReadAll,
  ReadOne,
  UpdateOne,
  CheckOut,
  DeleteOne,
  Search,
};

export default VisitorCtrl;
