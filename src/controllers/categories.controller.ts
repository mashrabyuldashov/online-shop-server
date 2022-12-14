import { Request, Response } from "express";
import categories from "../model/categories.model";
import validator from "../validations/categoryValidator";

export default {
  GET: async (_: Request, res: Response) => {
    try {
      res.json(
        await categories.find().populate({
          path: "sub_categories",
          select: "_id name",
        })
      );
    } catch (err) {
      throw new Error(err.message);
    }
  },
  GET_BY_ID: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      res.json(await categories.findById({ _id: id }));
    } catch (err) {
      throw new Error(err.message);
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const { error, value } = validator.validateCategory(req.body);

      if (error) {
        console.log(error, value);
        return res.send(error.details);
      }

      await categories.create({ name });

      res.json({
        status: 200,
        message: "Category added",
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await categories.findByIdAndUpdate(id, { name });

      res.json({
        status: 200,
        message: "The category has been changed",
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await categories.findByIdAndDelete(id);

      res.json({
        status: 200,
        message: "The category has been removed",
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
