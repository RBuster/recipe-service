import { Router } from "express";
import { Request, Response } from "express";
import { Manager } from "./../manager";
import passport from "passport";
import * as _ from "lodash";

const userRouter = Router();
const manager = new Manager();

userRouter.get("/getCurrentUser", async (req: Request, res: Response) => {
  return res.json(_.omit(req.user, ["password"]));
});

userRouter.post("/createUser", async (req: Request, res: Response) => {
  const user = await manager.userManager.createUser(req.body);
  return res.json(user);
});

userRouter.post(
  "/login",
  (req: Request, res: Response, next: Function) => {
    passport.authenticate("local", function (err, user) {
      if (err || !user) {
        return res.status(401).json("AUTH_INVALID");
      }
      return req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  },
  (req, res) => {
    return res.json(req.user);
  }
);

userRouter.get("/logout", (req: Request, res: Response) => {
  req.logOut();
  res.json({ isLoggedOut: true });
});

userRouter.post("/saveRecipeToUser", async (req: Request, res: Response) => {
  const result = await manager.userManager.saveRecipeToUser(
    req.body.userID,
    req.body.recipeID
  );
  return res.json(result);
});

userRouter.post(
  "/removeRecipeFromUser",
  async (req: Request, res: Response) => {
    const result = await manager.userManager.removeRecipeFromUser(
      req.body.userID,
      req.body.recipeID
    );
    return res.json(result);
  }
);

userRouter.post("/saveViewPreference", async (req: Request, res: Response) => {
  const result = await manager.userManager.saveViewPreference(
    req.body.userID,
    req.body.preference
  );
  return res.json(result);
});
export default userRouter;
