import { Router } from "express";
import passport from "passport";

import {
  handleGetAllTags,
  handleGetTagsCloud
} from "../controllers/tag.controller";

const router = Router();

router.get("/cloud", handleGetTagsCloud);
router.get("/", handleGetAllTags);

export default router;
