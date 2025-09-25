import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService{
 client = new Client()
 account;
 constructor(){
    this.client
    .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
 }
 async createAccount({email,password,name}){
try {
    const createAccount= await this.account.create({
    userId: ID.unique(),
    email: email,
    password: password,
    name:name
});
if(createAccount){
    return this.login({email,password});
}
} catch (error) {
    console.log(error);
} }
async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession({email,password});
    } catch (error) {
        console.log(error);
    }
}
async getCurrentUser(){
    try {
        return await this.account.get();
    }catch (err){
        console.log(err);
        return null;
    }
}
async logout(){
    try {
        return await this.account.deleteSession({
            sessionId: 'current'
        })
    }catch(err){
        console.log(err);
    }
}
}
const authService=new AuthService();
export default authService;