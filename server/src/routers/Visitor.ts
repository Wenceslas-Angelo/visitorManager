import express from "express";
import VisitorCtrl from "../controllers/Visitor";
import Auth from "../middlewares/Auth";

const router = express.Router();

router.post("/", Auth, VisitorCtrl.Create);
router.get("/today", Auth, VisitorCtrl.ReadAllToday);
router.get("/:id", Auth, VisitorCtrl.ReadOne);
router.put("/:id", Auth, VisitorCtrl.UpdateOne);
router.put("/checkout/:id", Auth, VisitorCtrl.CheckOut);
router.delete("/:id", Auth, VisitorCtrl.DeleteOne);

export default router;
