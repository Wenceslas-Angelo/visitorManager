import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const register = (req: Request, res: Response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...req.body,
        password: hash,
      });

      user
        .save()
        .then(() =>
          res.status(201).json({ message: "User registered successfully" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const login = (req: Request, res: Response) => {
  User.findOne({ matricule: req.body.matricule })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Wrong password" });
          }

          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            name: user.name,
            firstName: user.firstName,
            matricule: user.matricule,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User deleted successfully" }))
    .catch((error) => res.status(400).json({ error }));
};

const UserCtrl = { register, login, deleteUser };

export default UserCtrl;
