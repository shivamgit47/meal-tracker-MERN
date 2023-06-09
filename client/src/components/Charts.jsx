import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {CircleChart} from './CircleChart';
import { ColumnChart } from './ColumnChart';
import '../css/Charts.css'



const Charts = () => {

    const[frequency,setFrequency] = useState('1');
    const[chartData,setChartData] = useState([]);


   

    useEffect(()=>{
        const findChartDetails = async() => {
            const URL = 'http://localhost:9000';
            try{
                const result = await axios.post(`${URL}/getChart`,{frequency});
                setChartData(result.data);
                console.log("hellllllllooo",result.data)
            }
            catch(error)
            {
                console.log(error);
                console.log("Fetch issue in chart post api");
            }
        }
        findChartDetails();
    },[frequency]);

//total protein
    let totalProtein = 0;

chartData.forEach(item => {
  totalProtein += item.cals;
});

console.log("Total protein:", totalProtein);
//total cals,nutri
let totalNutrition = 0;

chartData.forEach(item => {
  const nutrition = item.cals * item.servings;
  totalNutrition += nutrition;
});

console.log("Total nutrition:", totalNutrition);

console.log("chartdfata",chartData);

// total cfp

const mealNutritionMap = {};


chartData.forEach(item => {
  const { mealId, protein, carb, fat } = item;

  if (mealNutritionMap.hasOwnProperty(mealId)) {
    mealNutritionMap[mealId].protein += protein;
    mealNutritionMap[mealId].carb += carb;
    mealNutritionMap[mealId].fat += fat;
  } else {
    mealNutritionMap[mealId] = {
      protein: protein,
      carb: carb,
      fat: fat
    };
  }
});

// Assign default values to missing mealIds
const allMealIds = ['meal1', 'meal2', 'meal3', 'meal4'];

allMealIds.forEach(mealId => {
  if (!mealNutritionMap.hasOwnProperty(mealId)) {
    mealNutritionMap[mealId] = { protein: 0, carb: 0, fat: 0 };
  }
});

console.log("Total nutrition by mealId:");
console.log(mealNutritionMap);


        
  return (
    <>  
      <div className='flex-container'>
        <div className='chart-child1'>
          <div className='cal-chart cal-btn'>
            <div className='cal-btn-heading'>
            <h6>Select Frequency</h6>
            </div>
          <select value={frequency} onChange={(e)=> setFrequency(e.target.value)}>

            <option value="7">This  Week</option>
            <option value="30">This Month</option>
            <option value="365">This Year</option>
            <option value="1">Today</option>
          </select>
          </div>
          <div className='cal-chart'>
           <CircleChart value={totalNutrition}/>
          </div>
        </div>

        <div className='chart-child2'>
          <div>
            <h6 className='child2-heading'>Nutrition Chart</h6>
          </div>
          <div className='child2-bar'>
          <ColumnChart data={mealNutritionMap}/>
          </div>
        
       </div>
      </div>

    </>
  )
}

export default Charts