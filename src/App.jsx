import './App.css'
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import Header from './componenets/Header/Header';
import Footer from './componenets/Footer/Footer';
import { Outlet } from 'react-router-dom';
function App() {

  //jb bhi db se kuch puchna wagera ho 
  // hoskta data aane mai time lge 
  //make loading state 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

    //jaise hi application load ho tho pucho ki app loggedin ho ki ni 

  useEffect(()=>{
    //puch user 
    authService.getCurrentUser()
    //if userdata hain
    .then((userData)=>{
      if(userData) {
        dispatch(login(({userData})))
      }
      //agr data ni milla hain tho ek activity hi call krado 
      //state hi updtae krdo logout 
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

// apne hisaab se return 
  // if(loading){
  //   return(
  //     <div>Loading...</div>
  //   )
  // }

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        {/* <Outlet /> */}
      </main>
      <Footer />
      </div></div>
  ) : null


}

export default App
