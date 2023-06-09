import express from "express";
import {addmeal,getmeal,addfood,getfood,getHomedata,deleteMeal,getEditfood,Editfood,deletefood} from "../controller/controller.js"
import {Register, Login,getchart} from "../controller/controller.js"
import Jwt  from "jsonwebtoken";

const jwtKey = 'meal-app';

const router = express.Router();

router.post('/Addmeal',verifyToken,addmeal);

router.get('/Addmeal',verifyToken,getmeal);

router.post('/Addfood',verifyToken,addfood);

router.get('/Addfood/:mealnumber',verifyToken,getfood);

router.get('/',verifyToken,getHomedata);

router.delete('/Addmeal/:mealnumber',verifyToken,deleteMeal);

router.get('/:id',verifyToken,getEditfood);

router.put('/:id',verifyToken,Editfood);

router.delete('/:id',verifyToken,deletefood);

router.post('/getChart',getchart);

router.post('/register',Register);

router.post('/login',Login);


//verification token
function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token)
    {
        token = token.split(' ')[1];
        
        Jwt.verify(token, jwtKey, (err,valid)=>{
            if(err) 
            {
                res.status(401).send({result:"Please provide valid token with header"});
            }
            else {
                next();
            }
        })
    }
    else{
        res.status(403).send({result:"Please add token with header"});
    }
    
    
}
export default router;