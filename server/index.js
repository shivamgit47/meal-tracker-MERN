import express from "express";
import Connection from "./database/db.js";
import Routes from "./routes/route.js";
import bodyParser from "body-parser";
import cors from "cors";
import Jwt  from "jsonwebtoken";

const jwtKey = 'meal-app';

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Routes);

const port= process.env.PORT || 9000;

app.listen(port,()=>{
    console.log(`Server is started and running ${port}`);
})