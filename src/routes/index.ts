import { Router } from "express";
import recipeRouter from "./recipe-router";
import userRouter from './user-router';

const apiRouter = Router();

apiRouter.use('/recipe', recipeRouter);
apiRouter.use('/user', userRouter)

export default apiRouter;