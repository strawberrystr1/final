import { Router } from "express";
import passport from "passport";

import {
  handleCreateCollection,
  handleDelete,
  handleGetCollections,
  handleGetOneCollection,
  handleUpdateCollection
} from "../controllers/collection.controller";
import {
  handleCreateItem,
  handleGetAllCollectionItems
} from "../controllers/item.controller";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);

router.get(
  "/:collectionId/item",
  passport.authenticate("jwt", { session: false }),
  handleGetAllCollectionItems
);
router.post(
  "/:collectionId/item/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateItem
);
router.post(
  "/:collectionId/update",
  passport.authenticate("jwt", { session: false }),
  handleUpdateCollection
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
router.delete(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  handleDelete
);

export default router;
