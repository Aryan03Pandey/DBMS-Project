import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, Link, json} from "react-router-dom"
import axios from 'axios'
import "./View.css"

function View() {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>{
            setUser({...resp.data[0]})
        }).catch((err)=>{
            console.log(err);
        })
    }, [id])

  return (
    <div>
        {JSON.stringify(user)}
    </div>
  )
}

export default View