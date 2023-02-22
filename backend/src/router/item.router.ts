import { Router } from "express";
import passport from "passport";
import {
  handleCreateItem,
  handleDeleteItem,
  handleGetAllCollectionItems,
  handleGetOneCollectionItem,
  handleUpdateItem,
  handleGetItemLikes,
  handleSSE
} from "../controllers/item.controller";
import { handleUpdateLike } from "../controllers/like.controller";

const router = Router();

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
router.get(
  "/:collectionId/item/:itemId/likes",
  passport.authenticate("jwt", { session: false }),
  handleGetItemLikes
);
router.post(
  "/:collectionId/item/:itemId/likes",
  passport.authenticate("jwt", { session: false }),
  handleUpdateLike
);
router.get("/:collectionId/item/:itemId/stream", handleSSE);
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
  "/:collectionId/item/:itemId",
  passport.authenticate("jwt", { session: false }),
  handleUpdateItem
);

export default router;
