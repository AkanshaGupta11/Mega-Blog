import React , {useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin} from '../store/authSlice'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"

function Login() {
    //login kroge tho khi tho lekr jaaoge 
   const navigate = useNavigate();
   //store ko info bhi tho bhejni 
   const dispatch = useDispatch(); 
   //usefom k simple syntax
   //register --> form handling way 

   const {register,handleSubmit} = useForm();
   //error handle krn a
   const [error , setError] =  useState("")

   const login = async(data) => {
    //jaise submissions tar liye error should be clear 
    setError("")

    try{
        const session = await authService.login(data) //data k andr ky hain -> obj hog
        //if session hain user logged in
        if(session){
            const userData = await authService.getCurrentUser();
            if(userData){
                dispatch(authLogin(userData));
            }
            navigate("/")
        } 

    }
    catch(error){
        setError(error.message)
    }
   }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className = {`mx-auto w-full max-w-lg bg-gray-100rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className='text-red-600 mt-8 tex-center'>
        {error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label = "Email"
                placeholder = "enter your email"
                type = "email"
                // use form ude kr rhe 
                //if not use ... tho agr kisi aur input mai bhi if we us eregister
                //every time value overwrite ho jaayegi 
                {...register("email",{
                    //object mai options pass krte 
                    //regexr --> email validate 
                    // ye kuch pattern include that your email dould have 
                    required: true,
                    vaildate:{
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                    }
                })}
                ></Input>

                <Input
                label = "Password"
                placeholder = "Enter your password"
                type = "password"
                {...register("password",{
                    reguired:true,
                    validate:{
                        matchPattern: (value) =>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                        "Enter a valid password"
                    }
                })}></Input>

                <Button
                children  = "Signin"
                type ="submit"
                className='w-full'></Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login