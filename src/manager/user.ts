import { UserModel } from "../models/user";
import { AuthEngine } from "./../engine/auth";
import { ResourceAccess } from "../resource-access";
import * as _ from "lodash";

export class UserManager {
  private _RA: ResourceAccess;
  private _authEngine: AuthEngine;

  constructor() {
    this._RA = new ResourceAccess();
    this._authEngine = new AuthEngine();
  }

  async getUserByID(id: string) {
    return this._RA.userRA.getUserByID(id);
  }

  async getUserByUserName(userName: string) {
    return this._RA.userRA.getUserByUserName(userName);
  }

  async createUser(user: UserModel) {
    return this._RA.userRA.createUser(await this._authEngine.createUser(user));
  }

  async login(userName: string, password: string) {
    const user: UserModel = await this._RA.userRA.getUserByUserName(userName);
    if (!user) throw new Error("Login invalid.");
    const valid = await this._authEngine.doesPasswordMatch(
      password,
      user.password
    );
    if (!valid) throw new Error("Login invalid.");
    return _.omit(user, ["password"]);
  }

  async saveRecipeToUser(userID: string, recipeID: string) {
    return this._RA.userRA.saveRecipeToUser(userID, recipeID);
  }

  async removeRecipeFromUser(userID: string, recipeID: string) {
    return this._RA.userRA.removeRecipeFromUser(userID, recipeID);
  }

  async saveViewPreference(userID: string, preference: string) {
    return this._RA.userRA.saveViewPreference(userID, preference);
  }
}
