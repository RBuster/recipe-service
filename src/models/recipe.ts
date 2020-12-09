export interface RecipeModel{
    _id: string;
    title: string;
    ingredient: Array<Ingredient>;
    directions: string;
}

interface Ingredient{
    measurement: string;
    item: string;
}