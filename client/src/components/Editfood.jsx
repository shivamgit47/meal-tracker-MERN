import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editfood, geteditfood } from '../api/api';
import "../css/Addfood.css"

const Editfood = () => {

    const[foods,setFood] = useState('');

    
    const onValueChange = (e) =>{
        console.log(e.target.name,e.target.value);
        setFood({
            ...foods,
            [e.target.name]:e.target.value
        })
    }

    const{id}=useParams();
    console.log(id);
    
    const navigate=useNavigate();

    const editFoodDetails = async (e) =>
    {
        e.preventDefault();
        await editfood(foods,id);
        navigate(-1);
    }


    useEffect(()=>{
        loadFoodDetails();
    },[]);

    const loadFoodDetails = async() =>
    {
        let response = await geteditfood(id);
        setFood(response.data);
        console.log(response.data);

    }
    

  return (
    <>
    <div>
        <div className='food-form-container'>
        <div className="food-heading">
        <h2>Edit Food</h2>
        </div>
        
        <form onSubmit={editFoodDetails}>

            <div className='food-input'>
            <div><h3>Meal Type</h3></div>
                <select name="mealId" onChange={onValueChange} required value={foods.mealId || ""}>
                <option value="">Select option</option>
                    <option value="meal1">Breakfast</option>
                    <option value="meal2">Lunch</option>
                    <option value="meal3">Dinner</option>
                    <option value="meal4">nacks</option>
                    

                </select>
            </div>

            <div className='food-input'>
            <div><h3>Choose Food</h3></div>
                <select name="food" onChange={onValueChange} required value={foods.food || ""}>
                    <option value="">Select option</option>
                    <optgroup label="Fruits">
                        <option value="Apple">Apple 🍏</option>
                        <option value="Banana">Banana 🍌</option>
                        <option value="Orange">Orange 🍊</option>
                        <option value="Watermelon">Watermelon 🍉</option>
                    </optgroup>
                    <optgroup label="Breads">
                        <option value="Wheatbread">Wheatbread 🍞</option>
                        <option value="Roti">Roti 🫓</option>
                        <option value="Paratha">Paratha 🌯</option>
                        <option value="Naan">Naan 🥖</option>
                    </optgroup>
                    <optgroup label="Dishes">
                        <option value="Dal">Dal 🍲</option>
                        <option value="Paneer">Paneer 🧀</option>
                        <option value="Veggies">Veggies 🥗</option>
                        <option value="Soup">Soup 🥘</option>
                    </optgroup>
                </select>
            </div>

            <div className='food-input'>
            <div><h3>Servings</h3></div>
                <input type="number" placeholder='servings ' name='servings' min='1' max='10'onChange={onValueChange} required value={foods.servings || ""}/>
            </div>

            <div className='food-input'>
            <div><h3>Protein</h3></div>
                <input type="number" placeholder='protein in grams...' name='protein' onChange={onValueChange} required value={foods.protein || ""}/>
            </div>
            <div className='food-input'>
            <div><h3>Carbs</h3></div>
                <input type="number" placeholder='carbs in grams...' name='carb' onChange={onValueChange} required value={foods.carb || ""}/>
            </div>
            <div className='food-input'>
            <div><h3>Fat</h3></div>
                <input type="number" placeholder='fat in grams...' name='fat' onChange={onValueChange} required value={foods.fat || ""}/>
            </div>

            <div className='food-input'>
            <div><h3>Calories</h3></div>
                <input type="number" placeholder='cals in Kcal' name='cals' onChange={onValueChange} required value={foods.cals || ""}/>
            </div>

            <div className='food-input food-btn'>
                <input className='fbtn1' type="submit" value='Update Food' />
            </div>
        </form>
        </div>
       
        

       


    </div>
    </>
  )
}

export default Editfood