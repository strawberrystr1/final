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
  handleDeleteItem,
  handleGetAllCollectionItems,
  handleGetOneCollectionItem
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
router.get(
  "/:collectionId/item/:itemId",
  passport.authenticate("jwt", { session: false }),
  handleGetOneCollectionItem
);
router.delete(
  "/:collectionId/item/:itemId",
  passport.authenticate("jwt", { session: false }),
  handleDeleteItem
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
