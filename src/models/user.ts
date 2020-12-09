import { ObjectId } from "mongodb";

export interface UserModel {
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  savedRecipes: Array<ObjectId>;
  canCreateRecipe: boolean;
  viewPreference: string;
}
