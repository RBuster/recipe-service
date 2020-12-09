import { RecipeModel } from "../models/recipe";
import { UserModel } from "../models/user";
import { ResourceAccess } from "../resource-access";

export class RecipeManager {
  private _RA: ResourceAccess;

  constructor() {
    this._RA = new ResourceAccess();
  }

  async getRecipes() {
    return this._RA.recipeRA.getRecipes();
  }

  async getRecipesByUser(user: UserModel) {
    return this._RA.recipeRA.getRecipesByUser(user);
  }

  async createRecipe(recipe: RecipeModel, user: UserModel) {
    if (!user.canCreateRecipe) {
      throw new Error("User cannot create recipe.");
    }
    return this._RA.recipeRA.createRecipe(recipe);
  }
}
