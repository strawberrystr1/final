import { Router } from "express";

import userRouter from "./user.router";
import collectionRouter from "./collection.router";

const router = Router();

router.use("/user", userRouter);
router.use("/collection", collectionRouter);

export default router;
