
import React from 'react';
import '../css/Cards.css'


const CardList = ({data}) => {
  console.log(data);
  
  return (
    <div>
      {data.map((val,index)=>{
        return(<table key={index}>
          <tbody>
              <tr className='table-list'>
                  <td>{val.food}</td>
                  <td>Servings{val.servings}</td>
              </tr>
          </tbody>
      </table>

         )
      })} 

    </div>
  )
}

export default CardList



