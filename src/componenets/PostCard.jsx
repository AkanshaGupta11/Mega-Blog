import React from 'react'
import appwriteService from '../appwrite/confug'
import { Link } from 'react-router-dom';

function PostCard({
    //variable k naam $id 
    $id,
    title,
    featuredImage
}) {
  return (
   //saara card should be clickable 
   <Link to ={`/post/${$id}`}>
    <div className='w-full bg-grey-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src= {appwriteService.getFilePreview(featuredImage)} alt = {title}
            className='roundex-xl'/>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </div>
   </Link> 
  )
}

export default PostCard;
