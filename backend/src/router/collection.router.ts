import { Router } from "express";
import passport from "passport";
import {
  handleCreateCollection,
  handleGetCollections
} from "../controllers/collection.controller";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleGetCollections
);

export default router;
