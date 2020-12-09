import { MongoFactory } from "../util/mongo-util";
import { Db, ObjectId } from "mongodb";
import { UserModel } from "../models/user";
import * as _ from "lodash";

export class User {
  constructor() {}

  async getUserByID(id: string) {
    const db: Db = await MongoFactory.initCookbook();
    return db.collection("users").findOne({
      _id: new ObjectId(id),
    });
  }

  async createUser(user: UserModel) {
    const db: Db = await MongoFactory.initCookbook();
    await db.collection("users").insertOne(user);
    return _.omit(user, ["password"]);
  }

  async getUserByUserName(userName: string) {
    const db: Db = await MongoFactory.initCookbook();
    return db.collection("users").findOne({
      userName: userName,
    });
  }

  async saveRecipeToUser(userID: string, recipeID: string) {
    const db: Db = await MongoFactory.initCookbook();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userID) },
        { $addToSet: { savedRecipes: recipeID } }
      )
      .then(() => {
        return { recipeID };
      });
  }

  async removeRecipeFromUser(userID: string, recipeID: string) {
    const db: Db = await MongoFactory.initCookbook();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userID) },
        { $pull: { savedRecipes: recipeID } }
      )
      .then(() => {
        return { recipeID };
      });
  }

  async saveViewPreference(userID: string, preference: string) {
    const db: Db = await MongoFactory.initCookbook();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userID) },
        { $set: { viewPreference: preference } }
      )
      .then(() => {
        return { userID };
      });
  }
}
