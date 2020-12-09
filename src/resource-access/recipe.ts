import { MongoFactory } from "../util/mongo-util";
import { Db, ObjectId } from "mongodb";
import { UserModel } from "../models/user";
import { RecipeModel } from "../models/recipe";
import * as _ from "lodash";

export class Recipe {
  constructor() {}

  async getRecipes() {
    const db: Db = await MongoFactory.initCookbook();
    return db.collection("recipes").find().toArray();
  }

  async searchRecipe(filterCondition: string = "") {
    const db: Db = await MongoFactory.initCookbook();
    return db
      .collection("recipes")
      .find({
        $or: [
          { name: { $regex: `.*${filterCondition}.*`, $options: "i" } },
          {
            ingredients: {
              item: { $regex: `.*${filterCondition}.*`, $options: "i" },
            },
          },
        ],
      }) //or on ingredients
      .toArray();
  }

  async getRecipeByID(id: string = "5fc96e64920666d5af11fe82") {
    const db: Db = await MongoFactory.initCookbook();
    return db.collection("recipes").findOne({
      _id: new ObjectId(id),
    });
  }

  async getRecipesByUser(user: UserModel) {
    const db: Db = await MongoFactory.initCookbook();
    const objectIDs = user.savedRecipes.map((id) => new ObjectId(id));
    return db
      .collection("recipes")
      .find({
        _id: {
          $in: objectIDs,
        },
      })
      .toArray();
  }

  async createRecipe(recipe: RecipeModel) {
    const db: Db = await MongoFactory.initCookbook();
    return db.collection("recipes").insertOne(_.omit(recipe, ["_id"]));
  }
}
