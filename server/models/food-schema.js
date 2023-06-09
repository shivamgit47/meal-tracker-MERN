import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    mealId : String,
    food : String,
    servings : Number,
    protein : Number,
    carb : Number,
    fat : Number,
    cals: Number,
    foodDate : Date,

     
})

const Food = mongoose.model('Food',foodSchema);

export default Food;