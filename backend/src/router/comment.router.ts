import { Router } from "express";
import passport from "passport";
import {
  handleCreateComment,
  handleGetItemComments
} from "../controllers/comment.controller";

const router = Router();

router.get("/:itemId/comment", handleGetItemComments);
router.post(
  "/:itemId/comment",
  passport.authenticate("jwt", { session: false }),
  handleCreateComment
);

export default router;
