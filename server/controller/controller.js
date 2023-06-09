import Meal from "../models/meal-schema.js";
import Food from "../models/food-schema.js";
import User from "../models/user-schema.js";
import moment from "moment";
import Jwt  from "jsonwebtoken";
const jwtKey = 'meal-app';



export const addmeal = async (req, res) => {
    const meal = req.body;
  
    try {
      // Check if a meal with the same mealnumber already exists
      const existingMeal = await Meal.findOne({
        $or: [{ mealnumber: meal.mealnumber }, { mealname: meal.mealname }], 
        });
  
        if (existingMeal) {
          let errorMessage = "Meal already exists";
          if (existingMeal.mealnumber === meal.mealnumber) {
            errorMessage += " with the same meal number";
          }
          if (existingMeal.mealname === meal.mealname) {
            errorMessage += " with the same meal name";
          }
          return res.status(409).json({ message: errorMessage });
        }
    
        const newMeal = new Meal(meal);
        await newMeal.save();
        res.status(201).json(newMeal);
      } catch (error) {
        res.status(500).json({ message: error.message });
    } 
    
  };


export const getmeal = async(req,res)=>{
    
    try
    {
        const meal = await Meal.find({}).sort({ mealnumber: 1 });
        res.status(200).json(meal);

    }
    catch(error)
    {
        res.status(409).json({message:error.message});
    }
}

export const addfood = async(req,res) =>{
    const food = req.body;
    const newFood = new Food(food);
    try
    {
        await newFood.save();
        res.status(201).json(newFood);
    }
    catch (error)
    {
        res.status(409).json({message : error.message});
        console.log("Error Ara")
    }
}

export const getfood = async(req,res)=>{
    
    try
    {   const mealnum = req.params.mealnumber;
        console.log(mealnum)
        const food = await Food.find({mealId:mealnum});
        res.status(200).json(food);

    }
    catch(error)
    {
        res.status(409).json({message:error.message});
    }
}



export const getHomedata = async (req, res) => {
    try {
      const pipeline = [
        {
          $lookup: {
            from: "meals",
            localField: "mealId",
            foreignField: "mealnumber",
            as: "results"
          }
        },
        {
          $unwind: "$results"
        },
        {
          $group: {
            _id: "$mealId",
            mealname: { $first: "$results.mealname" },
            pid:{$first: "$results._id"},
            userId:{$first: "$results.userId"},
            foods: {
              $addToSet: {
                _id : "$_id",
                food: "$food",
                servings: "$servings",
                carb:"$carb",
                protein:"$protein",
                fat:"$fat",
                cals:"$cals"
  
              }
            }
          }
        },{
          $sort: { _id: 1 }
        },
        {
          $project: {
            mealnumber: "$_id",
            mealname: 1,
            pid:1,
            userId:1,
            foods: 1,
          }
        }
      ];
  
      const foods = await Food.aggregate(pipeline);
  
      res.status(200).json(foods);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

//delete add meal cards

export const deleteMeal = async(req,res)=>{
    
    try
    {   const meal = req.params;
        await Meal.deleteOne({ mealnumber: meal.mealnumber });

        await Food.deleteMany({ mealId: meal.mealnumber });
        res.status(200).json({message:"deleted successfully"});

    }
    catch(error)
    {
        res.status(409).json({message:error.message});
    }
}

//getting single food

export const getEditfood = async(req,res)=>{
    
    try
    {   
        const food = await Food.findById(req.params.id);
        res.status(200).json(food);

    }
    catch(error)
    {
        res.status(404).json({message:error.message});
    }
}

//updating/editing single food

export const Editfood = async(req,res)=>{
    let food = req.body;
    const editfood = new Food(food);
    try
    {   
        await Food.updateOne({_id:req.params.id},editfood);
        res.status(200).json(editfood);
    }
    catch(error)
    {
        res.status(404).json({message:error.message});
    }
}

export const deletefood = async(req,res)=>{
    
    try
    {   
        await Food.deleteOne({_id:req.params.id});
        res.status(200).json({message:"food deleted successfully"});

    }
    catch(error)
    {
        res.status(409).json({message:error.message});
    }
}
//user registration
export const Register = async(req,res)=>{
    
  const user = req.body;
  const newUser = new User(user);
  try
  {
      let result = await newUser.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign({result}, jwtKey,{expiresIn : "2h"},(err,token)=>{
        if(err)
        {
          res.json({result: "something went wrong,Please try after sometime"})
        }
        res.status(201).json({result,auth:token});
      })
  }
  catch (error)
  {
      res.status(409).json({message : error.message});
      console.log("Error Ara")
  }
}


// user login
export const Login = async(req,res)=>{
  try
  {
    if(req.body.password && req.body.email){
      let user = await User.findOne(req.body).select("-password");
      if(user)
      {
        Jwt.sign({user}, jwtKey,{expiresIn : "2h"},(err,token)=>{
          if(err)
          {
            res.json({result: "something went wrong,Please try after sometime"})
          }
          res.status(201).json({user,auth:token});
        })
        
      }
      else
      {
        res.send({result:"No User Found"})
      }
    }
    else{
      res.send({result:"No User Found"})
    }

    
  }
  catch(error)
  {
    res.status(409).json({message : error.message});
  }

}
// chart api by frequency
export const getchart = async(req,res) => {
  try{
    const {frequency} = req.body;
    console.log(req.body)
    const chartdata = await Food.find({
      foodDate:{
        $gt : moment().subtract(Number(frequency),'d').toDate(),
      },
    });
    res.status(200).json(chartdata);
  }
  catch(error)
  {
    res.status(500).json(error);
  }
}





