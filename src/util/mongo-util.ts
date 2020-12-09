import { MongoClient, Db } from "mongodb";

export class MongoFactory {
  private static db: Db;
  static async initCookbook() {
    if (MongoFactory.db) {
      return MongoFactory.db;
    }
    const mongoString = process.env.MONGOURL as string; //SET THIS FOR HOSTING

    const db = await (
      await MongoClient.connect(mongoString, { useUnifiedTopology: true })
    ).db("cookbook");
    MongoFactory.db = db;
    return db;
  }
}
