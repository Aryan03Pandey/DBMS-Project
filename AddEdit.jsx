import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom" 
import "./AddEdit.css";
import axios  from 'axios';

const initialState = {
    cust_id: "",
    cust_name: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
}

function AddEdit() {
    const [data, setData] = useState(initialState);
    
    const {cust_id, cust_name, address, state, city, pincode} = data;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>{
            setData({...resp.data[0]})
        }).catch((err)=>{
            console.log(err);
        })
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!cust_id || !cust_name || !address || !state || !city || !pincode){
            alert("All fields required");
        }
        else{
            if(!id){
                axios.post("http://localhost:5000/api/post", 
                    {cust_id, cust_name, address, state, city, pincode})
                .then(() => {
                    setData({cust_id: "",cust_name: "",address: "",state: "",city: "",pincode: ""})
                })
                .catch((err) => console.log(err));

                alert("User Added");
            }
            else{                
                axios.put(`http://localhost:5000/api/update/${id}`, 
                {cust_id, cust_name, address, state, city, pincode})
                .then(() => {
                    setData({cust_id: "",cust_name: "",address: "",state: "",city: "",pincode: ""})
                })
                .catch((err) => console.log(err));
                
                alert("User Updated");
            }
                
            setTimeout(() => navigate("/"), 1000);
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault();

        const {name, value} = event.target;
        setData({...data, [name] : value})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="cust_id">Customer ID</label>
            <input type="number" name="cust_id" id="cust_id" placeholder='Enter Customer ID' value={cust_id || ""} onChange={handleInputChange} />

            <label htmlFor="cust_name">Customer Name</label>
            <input type="text" name="cust_name" id="cust_name" placeholder='Enter Customer Name' value={cust_name  || ""} onChange={handleInputChange} />

            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" placeholder='Enter Customer Address' value={address  || ""} onChange={handleInputChange} />

            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" placeholder='Enter State' value={state  || ""} onChange={handleInputChange} />

            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" placeholder='Enter City' value={city  || ""} onChange={handleInputChange} />

            <label htmlFor="pincode">Pincode</label>
            <input type="number" name="pincode" id="pincode" placeholder='Enter Pincode' value={pincode  || ""} onChange={handleInputChange} />

            <input type="submit" value={id? "Update" : "Save"} />

            <Link to="/">
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  )
}

export default AddEdit