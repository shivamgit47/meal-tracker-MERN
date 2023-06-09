import axios from 'axios';

const URL = 'http://localhost:9000';

export const addmeal = async(data) => {
    console.log(data);
    try{
        return await axios.post(`${URL}/Addmeal`,data,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
    }
    catch(error)
    {
        console.log("Error while add meal api");
    }
}

export const getmeal = async () => {
    try{
        return await axios.get(`${URL}/Addmeal`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }});
    } catch(error)
    {
        console.log("Error in get meal API",error);
    }
}

export const addfood = async(data) => {
    try{
        return await axios.post(`${URL}/Addfood`,data,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
        
    }
    catch(error)
    {
        console.log("Error while add food api");
    }
} 
export const getfood = async(mealnumber) => {
    try{
        return await axios.get(`${URL}/Addfood/${mealnumber}`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
    }
    catch(error)
    {
        console.log("Error while get food api");
    }
}


export const getHome = async () => {
    try{
        return await axios.get(`${URL}/`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }});
    } catch(error)
    {
        console.log("Error in get meal API",error);
    }
}

//delete meal card api

export const deleteTheMeal = async (mealnumber) => {
    try{
        return await axios.delete(`${URL}/Addmeal/${mealnumber}`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }});
    } catch(error)
    {
        console.log("Error in delete meal API",error);
    }
}

//getting food by id

export const geteditfood = async(id) => {
    try{
        return await axios.get(`${URL}/${id}`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
    }
    catch(error)
    {
        console.log("Error while get edit food api");
    }
}
//updating food by id
export const editfood = async(foods,id) => {
    try{
        return await axios.put(`${URL}/${id}`,foods,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
    }
    catch(error)
    {
        console.log("Error while update, edit food api");
    }
}

//deleting food by id
export const deleteThefood = async(id) => {
    try{
        return await axios.delete(`${URL}/${id}`,{ headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }}) 
    }
    catch(error)
    {
        console.log("Error while delete food api");
    }
}




// add new user regiration
export const adduser = async(data) => {
    try{
        const result = await axios.post(`${URL}/register`,data);
        localStorage.setItem("user",JSON.stringify(result.data.result));
        localStorage.setItem("token",JSON.stringify(result.data.auth));
        console.log(result);
        return result;
        
    }
    catch(error)
    {
        console.log("Error while register api");
    }
} 

//user
export const userlogin = async(data) => {
    try{
        const result = await axios.post(`${URL}/login`,data);
        
        console.warn(result.data);
        console.log(result.data);
        if(result.data.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.data.user));
            localStorage.setItem("token",JSON.stringify(result.data.auth));
        }
        else{
            alert("Please enter correct details");
        }

        return result;
        
        
    }
    catch(error)
    {
        console.log("Error while login api");
    }
} 



