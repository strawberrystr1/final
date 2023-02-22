import { Router } from "express";
import passport from "passport";

import {
  handleCreateCollection,
  handleDelete,
  handleGetCollections,
  handleGetOneCollection,
  handleUpdateCollection
} from "../controllers/collection.controller";
import itemsRouter from "./item.router";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);
router.use("/", itemsRouter);
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
router.delete(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  handleDelete
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleGetCollections
);

export default router;
