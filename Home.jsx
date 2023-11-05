import React, { useEffect, useState } from 'react'
import "./Home.css"
import {Link} from "react-router-dom";
import axios from "axios";

function Home() {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteUser = (cust_id) => {
        if(window.confirm("Confirm Delete")){
            axios.delete(`http://localhost:5000/api/remove/${cust_id}`);
            // alert("Account Deleted");
            setTimeout(() => {
                loadData();
            }, 500);
        }
    }

  return (
    <div className='home'>
        <Link to={"/addContact"}>
        <button className='btn btn-add'>Add Customer</button>
        </Link>

        <table className='table'>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Pincode</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return <tr>
                        {/* key = {item.id} */}
                        <td>{item.cust_id}</td>
                        <td>{item.cust_name}</td>
                        <td>{item.address}</td>
                        <td>{item.state}</td>
                        <td>{item.city}</td>
                        <td>{item.pincode}</td>
                        <td>
                            <Link to={`/update/${item.cust_id}`}>
                            <button className='btn btn-edit'>Edit</button>
                            </Link>

                            <button className='btn btn-delete' onClick={()=>deleteUser(item.cust_id)}>Delete</button>

                            <Link to={`/view/${item.cust_id}`}>
                            <button className='btn btn-view'>View</button>
                            </Link>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Home;