import { Router } from "express";

import userRouter from "./user.router";
import collectionRouter from "./collection.router";
import itemRouter from "./item.router";

const router = Router();

router.use("/user", userRouter);
router.use("/collection/item", itemRouter);
router.use("/collection", collectionRouter);

export default router;
