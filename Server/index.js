import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "aryan280703",
    database: "elec_dept"
})

app.get("/", (req, res)=>{
    const sqlInsert = "INSERT INTO `customer` VALUES (999,'ARYAN','MG Road','Karnataka','Mysore',570008)";
    db.query(sqlInsert, (error, result) => {
        console.log("error", error);
        console.log("result", result);
        res.send("Hello");
    })
})

app.get("/api/get", (req, res) => {
    const sqlget = "SELECT * FROM customer";
    db.query(sqlget, (error, result) => {
        console.log("error", error);
        console.log("result", result);
        
        res.send(result);
    })
})

app.post("/api/post", (req, res) => {
    const {cust_id, cust_name, address, state, city, pincode} = req.body;
    const sqlInsert = "INSERT INTO `customer` VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [cust_id, cust_name, address, state, city, pincode], (error, result) => {
        if(error){
            console.log(error);
        }
    });
})

app.delete("/api/remove/:cust_id", (req, res) => {
    const {cust_id} = req.params;
    const sqlRemove = "DELETE FROM `customer` WHERE cust_id = ?";
    db.query(sqlRemove, cust_id, (error, result) => {
        if(error){
            console.log(error);
        }
    });
})

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;

    const sqlget = "SELECT * FROM `customer` WHERE cust_id = ?";
    db.query(sqlget, id,  (error, result) => {
        console.log("error", error);
        console.log("result", result);
        
        res.send(result);
    })
})

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {cust_id, cust_name, address, state, city, pincode} = req.body;

    const sqlUpdate = "UPDATE `customer` SET cust_id = ?, cust_name = ?, address = ?, state = ?, city = ?, pincode = ? WHERE cust_id = ?"
    
    db.query(sqlUpdate, [cust_id, cust_name, address, state, city, pincode, id],  (error, result) => {
        console.log("error", error);
        // console.log("result", result);
        
        res.send(result);
    })
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})