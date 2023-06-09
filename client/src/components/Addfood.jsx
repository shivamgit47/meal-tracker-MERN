import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addfood, getfood, deleteThefood } from '../api/api';
import { Link } from 'react-router-dom';
import "../css/Addfood.css"



const Addmeal = () => {
    const { mealnumber } = useParams();
    console.log(mealnumber);


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const newtime = `${year}-${month}-${day}`;
    const dateObj = new Date(newtime);
    console.log(dateObj);

    const defaultValue = {
        mealId: mealnumber,
        food: "",
        servings: "",
        protein: "",
        carb: "",
        fat: "",
        cals: "",
        foodDate: dateObj,
    }
    const [foods, setFood] = useState(defaultValue);
    const [viewfood, setviewFood] = useState([]);
    const [reload, setreload] = useState(false);



    const onValueChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFood({
            ...foods,
            [e.target.name]: e.target.value
        })
    }




    const addFoodDetails = async (e) => {
        e.preventDefault();
        await addfood(foods);
        setFood({});
        setreload(true);
    }

    const navigate = useNavigate(-1)

    useEffect(() => {
        getFoodDetails();
    }, [reload]);

    const getFoodDetails = async () => {
        let response = await getfood(mealnumber);
        setviewFood(response.data);
        console.log(response.data);

    }

    const deleteFood = async (id) => {
        await deleteThefood(id);
        getFoodDetails();
    }

        ;


    return (
        <>
            <div>
                <div className='food-form-container'>
                    
                    <div className='food-heading'>
                        <h2>Add Food</h2>
                    </div>
                    <form onSubmit={addFoodDetails}>
                        <div className='food-input'>
                            <input type="hidden" name='mealId' onChange={onValueChange} required value={mealnumber} />
                        </div>

                        <div className='food-input'>
                            <input type="hidden" name='foodDate' placeholder='enter date' onChange={onValueChange} />
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
                            <input type="number" placeholder='servings' name='servings' min='1' max='10' onChange={onValueChange} required value={foods.servings || ""} />
                        </div>

                        <div className='food-input'>
                        <div><h3>Protein</h3></div>
                            <input type="number" placeholder='protein in grams...' name='protein' onChange={onValueChange} required value={foods.protein || ""} />
                        </div>
                        <div className='food-input'>
                        <div><h3>Carbs</h3></div>
                            <input type="number" placeholder='carbs in grams...' name='carb' onChange={onValueChange} required value={foods.carb || ""} />
                        </div>
                        <div className='food-input'>
                        <div><h3>Fat</h3></div>
                            <input type="number" placeholder='fat in grams...' name='fat' onChange={onValueChange} required value={foods.fat || ""} />
                        </div>

                        <div className='food-input'>
                        <div><h3>Calories</h3></div>
                            <input type="number" placeholder='cals in Kcal..' name='cals' onChange={onValueChange} required value={foods.cals || ""} />
                        </div>

                        <div className='food-input food-btn'>
                            <input  className='fbtn1' type="submit" value='Add Food' />
                        </div>
                        <div className='food-input food-btn'>
                        <input className='fbtn2' type="submit" value="Back /Add meal" onClick={() => navigate
                                ('/Addmeal')} />
                        </div>
                    </form>

                </div>



                <div className='table-container'>
                    <div className='food-heading'>
                    <h2>Update Food Details</h2>
                    </div>
                    
                    <table className='table-parent'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Meal-No.</th>
                                <th>Food-name</th>
                                <th> Servings</th>
                                <th>Protein</th>
                                <th>Carbs</th>
                                <th>Fat</th>
                                <th>Calories</th>
                                <th>Date</th>
                                <th>Edit/Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewfood.map((val, index) => {
                                return (<tr key={val._id}>
                                    <td>{index+1}</td>
                                    <td>{val.mealId}</td>
                                    <td>{val.food}</td>
                                    <td>{val.servings}</td>
                                    <td>{val.protein}</td>
                                    <td>{val.carb}</td>
                                    <td>{val.fat}</td>
                                    <td>{val.cals}</td>
                                    <td>{val.foodDate}</td>
                                    <td>
                                        <button className='btn-table1'><Link to={`/Editfood/${val._id}`} >Edit</Link></button>
                                        <button className='btn-table2'onClick={() => { deleteFood(val._id) }}>Delete</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>


                
            </div>
        </>
    )
}

export default Addmeal