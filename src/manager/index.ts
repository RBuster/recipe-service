import {RecipeManager} from './recipe';
import { UserManager } from './user';

export class Manager{
    recipeManager: RecipeManager;
    userManager: UserManager;
    constructor(){
        this.recipeManager = new RecipeManager();
        this.userManager = new UserManager();
    }
}