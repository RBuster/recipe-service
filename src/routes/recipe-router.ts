import { Router } from "express";
import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { Manager } from "./../manager";

const recipeRouter = Router();
const manager = new Manager();

recipeRouter.get("/getRecipes", async (req: Request, res: Response) => {
  return res.json(await manager.recipeManager.getRecipes());
});

recipeRouter.post("/getRecipesByUser", async (req: Request, res: Response) => {
  return res.json(await manager.recipeManager.getRecipesByUser(req.body));
});

recipeRouter.post("/createRecipe", async (req: Request, res: Response) => {
  return res.json(
    await manager.recipeManager.createRecipe(req.body, req.user as UserModel)
  );
});

export default recipeRouter;
