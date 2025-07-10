import conf from "../config/conf.js";
import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor (){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    handleError(error){
        throw(error);
    }
    // ye ek service 
    // logo ni pta underhood ky hooga they just know ki value pass kro or acc is created 
    async createAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email,password,name);
            console.log(userAccount);
            if(userAccount){
                //call another method
                //if user acc exist --> login kr do 
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            this.handleError(error);
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch(error){
            this.handleError(error);
        }
    }


    //hoem page pai ho tho app loin ho y nhi ho 
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){ // reach out ni kr paaye service ko 
            this.handleError(error);
        }

        return null; // if else se kr skte ki agr value ni aaye th ky krnege 
    }

    async logOut(){
        try{
            await this.account.deleteSessions();

        } catch(error){
            console.log("Appwrite service :: logout :: eror" , error);
        }
    }
}

const authService = new AuthService();

// export default AuthService;
//jho bhi iss clas ko use krega usse ek nya obj bnana pdega 
//tbhi methods ko use kr paayega 
// tho vho aaye or baar baar obj bnaya 
// we will only create an object or vho bss usko import kr lega 

export default authService ;
//authService. access of obj

// ek client chahiye 
//ek acc

// mai chat ki jb obj bne tbhi acc bne
