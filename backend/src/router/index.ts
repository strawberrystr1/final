import { Router } from "express";

import userRouter from "./user.router";
import collectionRouter from "./collection.router";
import tagsRouter from "./tag.router";
import { handleSearch } from "../controllers/search.controller";

const router = Router();

router.use("/user", userRouter);
router.use("/collection", collectionRouter);
router.use("/tags", tagsRouter);
router.get("/search", handleSearch);

export default router;
