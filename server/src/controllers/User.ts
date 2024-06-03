import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hash });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ matricule: req.body.matricule });
    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
      name: user.name,
      firstName: user.firstName,
      matricule: user.matricule,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const UserCtrl = { register, login, deleteUser };

export default UserCtrl;
