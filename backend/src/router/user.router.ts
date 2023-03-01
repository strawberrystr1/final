import { Router } from "express";
import passport from "passport";
import {
  getAllContoller,
  loginController,
  registrationController,
  settingsController,
  deleteController
} from "../controllers/user.controller";

const router = Router();

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  getAllContoller
);
router.post(
  "/settings",
  passport.authenticate("jwt", { session: false }),
  settingsController
);
router.delete(
  "/settings",
  passport.authenticate("jwt", { session: false }),
  deleteController
);
router.post("/register", registrationController);
router.post("/login", loginController);

export default router;
