import { Request, Response } from "express";
import moment from "moment";
import Visitor from "../models/Visitor";

const Create = async (req: Request, res: Response) => {
  try {
    const newVisitor = new Visitor({ ...req.body, startDateTime: new Date() });
    const visitor = await newVisitor.save();
    res.status(201).json({ visitor });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const ReadAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const purpose = req.query.purpose || "";
    const date = (req.query.date as string) || "";

    const filter: { [key: string]: any } = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
        ],
      }),
      ...(purpose && { purpose: { $regex: purpose, $options: "i" } }),
    };

    if (date) {
      const startDate = moment(date).startOf("day").toDate();
      const endDate = moment(date).endOf("day").toDate();
      filter.startDateTime = { $gte: startDate, $lt: endDate };
    }

    const visitors = await Visitor.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const totalVisitors = await Visitor.countDocuments(filter);

    res.status(200).json({
      visitors,
      totalVisitors,
      totalPages: Math.ceil(totalVisitors / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ReadAllToday = async (req: Request, res: Response) => {
  try {
    const search = req.query.search || "";
    const purpose = req.query.purpose || "";
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();

    const filter: { [key: string]: any } = {
      startDateTime: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
        ],
      }),
      ...(purpose && { purpose: { $regex: purpose, $options: "i" } }),
    };

    const visitors = await Visitor.find(filter).sort({ _id: -1 });
    const totalVisitors = await Visitor.countDocuments(filter);

    res.status(200).json({
      visitors,
      totalVisitors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ReadOne = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findOne({ _id: req.params.id });
    res.status(200).json({ visitor });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const UpdateOne = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(201).json({ visitor });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const CheckOut = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { $set: { endDateTime: new Date() } },
      { new: true }
    );
    res.status(201).json({ visitor });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const DeleteOne = async (req: Request, res: Response) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    res.status(200).json({ visitor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const VisitorCtrl = {
  Create,
  ReadAll,
  ReadOne,
  ReadAllToday,
  UpdateOne,
  CheckOut,
  DeleteOne,
};

export default VisitorCtrl;
