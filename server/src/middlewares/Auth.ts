import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  auth?: {
    userId: string;
  };
}

const Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET") as JwtPayload;
    const userId = decodedToken.userId;
    req.auth = {
      userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default Auth;
