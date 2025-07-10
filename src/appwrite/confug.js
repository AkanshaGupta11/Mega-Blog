import conf from "../config/conf";
import authService from './auth'
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; //sttorage

    constructor (){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch(error){
           console.log("Appwrite service :: createPost :: error" ,error); 
        }
    }
//userid ni di kyuki jisne post n=bnayi bss vho edit kr skta that wy 
    async updatePost(slug,{title,content,featuredImage,status}){ //slug se hi tho identify hoga konsa update krna   
        try{
           return await  this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status, 
            }
           )
        }
        catch(error){
           console.log("Appwrite service :: updatePost :: error" ,error); 
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true; // hn delete hogya 
        }
        catch(error){
           console.log("Appwrite service :: deletePost :: error" ,error); 
           return false;

        }
    }
// ho skta ek post chahiye 
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch(error){
            console.log("Appwrite service :: getPost :: error" ,error); 
        }
    }

// saar document chahiye saare post 
// ar saare doc liye tho vho doc bhi aa jaayenge jismai status is inaactive 
//variable name is queries 
//status --> key --> indexes --> query lga skte 
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            const user = await authService.getCurrentUser();
            if(user){
                return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                //pagination 
            )
            }

            
            
        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error" ,error); 
            return false;
        }
    }

    //file upload service 

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                //unique id 
                ID.unique(),
                file,
            )
            
        }
        catch(error){
           console.log("Appwrite service :: upload file :: error" ,error); 
            return false;
        }
    }
//id of file
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: delete file :: error" ,error); 
           return false
        }
    }

    //ek aur service 
    //get file prview 
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const service = new Service();
export default service;