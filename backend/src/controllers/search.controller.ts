import { Request, Response } from "express";
import { SOMETHING_WRONG } from "../constants/httpMessages";
import { searchItems } from "../services/search.service";
import { HTTPCodes } from "../types/httpCodes";

export const handleSearch = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || query.length === 0) {
      res.json([]);
      return;
    }

    const results = await searchItems(query as string);
    res.json(results);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
