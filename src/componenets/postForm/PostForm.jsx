import React , {useCallback, useEffect} from 'react'
//This is a popular library for managing forms in React. It helps with input registration, validation, and form state.
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import Logo from '../Logo'
import Select from '../Select'
import RTE from '../RTE.jsx'
import appwriteService from '../../appwrite/confug'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {
    //y tho user edit krne aay ay nhi valu lene 
    //if ni val lene -> ""
    //lein edit krne need to pass some default values 

    //get value --> current form values 
    const {register,handleSubmit, watch, setValue, control,getValues} = useForm({
        defaultValues :{
            title : post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status : post?.status || "active"
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData)

    //agr form submit kiya 
    //agr post ki value hain tho updat nhi hain tho nya 
    const submit = async(data) =>{
//If post exists, the form is in "edit" mode
        //agr post hain 
        //Checks if a new image is uploaded. If so, uploads it using
        //humne kii file select ki hain tho [file1]
        //image[0]
        if(post){
            //if post hain tho edit krne jaa rhe 
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]): null
            //purani img delete 
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,

                
            })

            if(dbPost){
                navigate('/post/${dbPost.$id}')
            }
        }

        //agr post nhi hain 
        else{
            const file = await appwriteService.uploadFile(data.image[0]);
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId : userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
//title ko watch krna or slug ko convert krna 
//agr title mai space atti tho usko dash mai convert krna 

    const slugTransform = useCallback((value) => {
        if(value && typeof value == 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g,'-')
        
        
        }
        return '';
    },[])

useEffect(() => {
    const subscription = watch((value,{name}) =>{
        if(name === 'title'){
            setValue('slug',slugTransform(value.title,
                {shouldValidate: true}
            ))
        }
    })

    return () =>{
        subscription.unsubscribe() // optimization 
    }
},[watch,slugTransform,setValue])
  return (
    <form onSubmit = {handleSubmit(submit)} className = "flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input 
            label = "Title"
            placeholder = "Title"
            className = "mb-4"
            {...register("title",{
                requird:true 
            })}
            />

            <Input 
            label = "Slug"
            placeholder = "Slug"
            className = "mb-4"
            {...register("slug",{
                required:true
            })}
            onInput = {(e) =>{
                setValue("slug",slugTransform(e.currentTarget.value),{
                    shouldValidate:true
                })
            }}
            />
            <RTE label = "Content :"
            name ="content"
            control = {control}
            defaultValue = {getValues("content")} />
        </div>

        <div className='w-1/3 px-2'>
            <Input 
            label = "Featured Image:"
            type = "file"
            className = "mb-4"
            accept = "image/png, image/jpg, image/jpeg, image/gif"
            {...register("image",{required:!post})}
            />

            {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
        </div>

    </form>
  )
}

export default PostForm