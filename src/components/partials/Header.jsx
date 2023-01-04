import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/reducers/auth'


export default function Header() {
    const dispatch = useDispatch();
    const { userToken, auth } = useSelector((state)=>state.configAuth);

    useEffect(()=>{
    },[userToken, auth])
  return (
    <div>
        {userToken ? (
            <button className='button' onClick={() => dispatch(logout())}>
                Logout
            </button>
        ) : (
            <NavLink className='button' to='/login'>
              Login
            </NavLink>
        )}
        <br />
        <NavLink className='button' to='/'>
        Home
        </NavLink>
        <br />
        <NavLink className='button' to='/post'>
        Post
        </NavLink>
    </div>
  )
}
