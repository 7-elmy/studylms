import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {

    if(!sessionStorage.getItem("token") || !localStorage.getItem('token'))
    {
       return <Navigate to='/login'/>

    }
    else
    {
        return props.children;
    }
 
}