import React from 'react'
import { useState } from 'react'
import { addmeal, getmeal ,deleteTheMeal} from '../api/api';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Mealcard.css';
import '../css/Addmeal.css'


const Addmeal = () => {
    const defaultValue = {
        mealname: "",
        mealnumber: "",
        userId:JSON.parse(localStorage.getItem('user'))._id,
    }

    const[meal,setMeal] = useState(defaultValue);
    const[mealcard,setmealcard] = useState([]);
    const[reload,setreload] = useState(false);
    console.log(meal.mealname,meal.mealnumber,meal.userId);
    const onValueChange = (e) =>{
        console.log(e.target.name,e.target.value);
        setMeal({
            ...meal,
            [e.target.name]:e.target.value
        })
    }

    const addMealDetails = async (e) =>
    {

        e.preventDefault();
        await addmeal(meal);
        setreload(true);
        setMeal({});
    }

    const navigate=useNavigate();

    useEffect(()=>{
        getMealDetails();
    },[reload]);

    const getMealDetails = async() =>
    {
        let response = await getmeal();
        setmealcard(response.data);
        console.log(response.data);

    }

    const deleteMeal = async(mealnum)=>{
        await deleteTheMeal(mealnum);
        getMealDetails();
    }

  return (
    <>
        <div className='addmeal-container'>
            <div className='form-container'>
            
            <h2 className='form-heading'>Add meal</h2>
            <form onSubmit={addMealDetails}>
                <div className='meal-input'>
                    <label htmlFor="mealname">Select Mealname:</label>
                    <select name="mealname" onChange={onValueChange} value={meal.mealname || ""} required>

                        <option value="">Select option </option>
                        <optgroup label="Meal 1">
                            <option value="breakfast">Breakfast</option>
                        </optgroup>
                        <optgroup label="Meal 2">
                            <option value="lunch">Lunch</option>
                        </optgroup>
                        <optgroup label="Meal 3">
                        <option value="dinner">Dinner</option>
                        </optgroup>
                        <optgroup label="Meal 4">
                        <option value="snacks">Snacks</option>
                        </optgroup>
                    </select>
            </div>

            <div className='meal-input'>
                <label htmlFor="mealnumber">Select Mealnumber:</label>
                <select name="mealnumber" onChange={onValueChange} value={meal.mealnumber || ""} required>
                    <option value="">Select option </option>
                    <optgroup label="Breakfast">
                        <option value="meal1">Meal 1</option>
                    </optgroup>
                    <optgroup label="Lunch">
                        <option value="meal2">Meal 2</option>
                    </optgroup>
                    <optgroup label="Dinner">
                    <option value="meal3">Meal 3</option>
                    </optgroup>
                    <optgroup label="Snacks">
                    <option value="meal4">Meal 4</option>
                    </optgroup>
                </select>
            </div>
            <div>
                <input type="hidden" name='userId' value={JSON.parse(localStorage.getItem('user'))._id} onChange={onValueChange}/>
            </div>

            <div className='meal-btn'>
                <input className='meal-btn1' type="submit" value="Add meal"/>
                <input className='meal-btn2'type="submit" value="Go Back/Home" onClick={()=>navigate
                ('/')}/>
            </div>

        
        </form>
            </div>
        
            <div> 
                <div className='meal-heading-div'>
                    <h2 className='meal-heading'>Meal Cards</h2>
                    <p className='meal-para'>Add new food or update food menu here</p>
                </div>
            <div className='main-container' >

                {mealcard.map((val,index)=>{
                        return(
                            <div className="card-container" key={val._id}>
                                <div className="card">
                                    <div className="card-preview">
                                        <h2>{val.mealname}</h2>
                                        <h4>{val.mealnumber}</h4>
                                    </div>
                                    <div className="card-list">
                                        <button className="btn1"><Link to={`/Addfood/${val.mealnumber}`} >Add / Update food</Link></button>
                                    <button className="btn2" onClick={()=>{deleteMeal(val.mealnumber)}}>Delete</button>
                                    </div>
                                </div>
                            </div>
                             )
                            })} 
            </div> 
        </div>
    </div>
    </>
  )
}

export default Addmeal