import React , {useState, useEffect}from 'react'
import appwriteService from "../appwrite/confug"
import {Container, PostCard } from '../componenets'
function AllPosts() {
    const [post,setPosts] = useState([])

    useEffect(()=>{
        appwriteService.getPosts([])
        .then((posts)=> {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
            {post.map((posts)=>(
                <div key ={posts.$id} className='p-2 w-1/4'>
                    <PostCard post = {posts} />
                </div>
            ))}
           </div>
        </Container>

    </div>
  )
}

export default AllPosts