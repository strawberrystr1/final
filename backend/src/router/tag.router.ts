import { Router } from "express";
import passport from "passport";

import { handleGetAllTags } from "../controllers/tag.controller";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleGetAllTags
);

export default router;