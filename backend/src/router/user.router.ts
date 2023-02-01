import { Router } from "express";
import passport from "passport";
import {
  getAllContoller,
  loginController,
  registrationController
} from "../controllers/user.controller";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllContoller
);
router.post("/register", registrationController);
router.post("/login", loginController);

export default router;
