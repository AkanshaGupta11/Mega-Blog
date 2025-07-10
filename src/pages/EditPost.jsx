import React, {useState,useEffect} from 'react'
import { Container,PostForm } from '../componenets'
import appwriteService from "../appwrite/confug"
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
    const [post,setPosts] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/');
        }
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post = {post} />
        </Container>
    </div>
  ) : null
}

export default EditPost

//individual post delete edit 