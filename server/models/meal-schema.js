import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealnumber : String,
    mealname: String,
    userId: String

     
})

const Meal = mongoose.model('Meal',mealSchema);

export default Meal;