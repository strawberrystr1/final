import { Router } from "express";
import passport from "passport";

import {
  handleCreateCollection,
  handleDelete,
  handleGetCollections,
  handleGetOneCollection,
  handleUpdateCollection,
  handleGetBiggestCollections
} from "../controllers/collection.controller";
import itemsRouter from "./item.router";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  handleCreateCollection
);
router.get('/biggest', handleGetBiggestCollections)
router.use("/", itemsRouter);
router.post(
  "/:collectionId/update",
  passport.authenticate("jwt", { session: false }),
  handleUpdateCollection
);
router.get(
  "/:collectionId",
  handleGetOneCollection
);
router.delete(
  "/:collectionId",
  passport.authenticate("jwt", { session: false }),
  handleDelete
);
router.get(
  "/",
  handleGetCollections
);

export default router;
