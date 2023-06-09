import React, { useState, useEffect } from 'react'
import '../css/Homepage.css';
import '../css/Cards.css'
import { getHome } from '../api/api';
import CardList from './CardList';
import { Link } from 'react-router-dom';
import { deleteTheMeal } from '../api/api';
import Charts from './Charts';

const Homepage = () => {

  const [data, setData] = useState([]);


  console.log("datazzzzzzz", data)
  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    let response = await getHome();
    setData(response.data);
    console.log(response.data);

  }
  const deleteCard = async (mealnumber) => {
    await deleteTheMeal(mealnumber);
    getCardData();
  }




  return (
    <div className='home-container'>
      <div className='chart-area area-one'>
          <div className='chart-heading-div'>
            <h2 className='chart-heading'>Analytics</h2>
          </div>
          <Charts />
      </div>

      <div className='chart-area area-two'>
        <div className='chart-heading-div'>
          <h2 className='chart-heading'>Meal Cards</h2>
        </div>
        <div className='main-container'>
          {data.map((val, index) => {
            return (
              <div className="card-container" key={index}>
                <div className="card1">
                  <div className="card-preview">
                    <h2>{val.mealname}</h2>
                    <h4>{val.mealnumber}</h4>
                  </div>
                  <div className="card-list">
                    <CardList data={val.foods} />
                    <button className='btn1'><Link to={`/Addfood/${val._id}`}>Update Details</Link></button>
                    <button className="btn2" onClick={() => deleteCard(val.mealnumber)}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
      
    </div>
  )
}

export default Homepage