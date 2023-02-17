import { Router } from "express";
import passport from "passport";
import {
  handleCreateCollection,
  handleGetCollections,
  handleGetOneCollection
} from "../controllers/collection.controller";
import { handleCreateItem } from "../controllers/item.controller";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);
router.post(
  "/:collectionId/item/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateItem
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
