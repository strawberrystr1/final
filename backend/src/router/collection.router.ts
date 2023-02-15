import { Router } from "express";
import passport from "passport";
import {
  handleCreateCollection,
  handleGetCollections,
  handleGetOneCollection
} from "../controllers/collection.controller";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);
router.get(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  handleGetOneCollection
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleGetCollections
);

export default router;
