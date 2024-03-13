import express from "express";
import VisitorCtrl from "../controllers/Visitor";
import Auth from "../middlewares/Auth";

const router = express.Router();

router.post("/", Auth, VisitorCtrl.create);
router.get("/", Auth, VisitorCtrl.getAll);
router.get("/:id", Auth, VisitorCtrl.getOne);
router.put("/:id", Auth, VisitorCtrl.updateVisitor);
router.put("/endDateTime/:id", Auth, VisitorCtrl.updateEndDateTime);
router.delete("/:id", Auth, VisitorCtrl.deleteOne);

export default router;
