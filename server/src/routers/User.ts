import express from "express";
import UserCtrl from "../controllers/User";
import Auth from "../middlewares/Auth";

const router = express.Router();

router.post("/register", UserCtrl.register);
router.post("/login", UserCtrl.login);
router.delete("/delete/:id", Auth, UserCtrl.deleteUser);

export default router;
