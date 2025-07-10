import React from 'react'
import {useDispatch} from'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice'

function LogoutBtn() {
  //logout krenge tho kuch info bhejni pdegi 
    const dispatch = useDispatch();

    const logoutHandler = () => (
        authService.logOut()
        .then(() => {
            dispatch(logout())
        })
    )

    //conditional rending krenge 
    //if login hoga tho hi logout krayenge 
    //vrna ky hi kr waayenge 
  return (
    <button
    className= 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn