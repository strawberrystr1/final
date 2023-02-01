import { Router } from "express";
import passport from "passport";
import {
  getAllContoller,
  registrationController
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registrationController);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllContoller
);

export default router;
