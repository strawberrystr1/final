import { Request, Response } from "express";
import { SOMETHING_WRONG } from "../constants/httpMessages";
import { getAllTags, getTagsCloud } from "../services/tag.service";
import { HTTPCodes } from "../types/httpCodes";

export const handleGetAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await getAllTags();

    res.json(tags);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetTagsCloud = async (req: Request, res: Response) => {
  try {
    const tags = await getTagsCloud();

    res.json(tags);
  } catch (e) {
    console.log('e: ', e);
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
