import * as bcrypt from "bcrypt";
import { UserModel } from "./../models/user";
import { ResourceAccess } from "../resource-access";

export class AuthEngine {
  private _RA: ResourceAccess;
  constructor() {
    this._RA = new ResourceAccess();
  }

  async createUser(user: UserModel) {
    const previousUser = await this._RA.userRA.getUserByUserName(user.userName);
    if (previousUser)
      throw new Error("UserName already exists. Choose another.");
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    user.canCreateRecipe = false;
    user.savedRecipes = [];
    user.viewPreference = "VIEWALL";
    return user;
  }

  async doesPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
