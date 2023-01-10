import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom'

const Protected = () => {
    const { auth } = useSelector((state)=> state.auth);
    if(!auth){
        return (
        <div className='unauthorized'>
            <h1>Unauthorized :</h1>
            <span>
            <NavLink to='/login'>Login</NavLink> to gain access
            </span>
        </div>
        )      
    }
    return <Outlet />
}

export default Protected;
