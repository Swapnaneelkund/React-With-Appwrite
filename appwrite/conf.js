import { Client, ID, TablesDB , Storage, Query} from "appwrite";
import config from "../config/config";
import { configureStore } from "@reduxjs/toolkit";
class DatabaseStorage{
    client=new Client();
    database;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.appWriteUrlL)
        .setProject(config.appWriteProjectId);
        this.database=new TablesDB(this.client);
        this.storage=new Storage(this.client);
        const CreatePost= async({title,slug,content,featuredImage,status,userID})=>{
            try {
                return await this.database.createDocument({
                    databaseId:config.appWriteDatabaseId,
                    collectionId:config.appWriteCollectionId,
                    documentId:slug,
                    data:{title,content,featuredImage,status,userID}
                })
            }catch(err){
                console.log(err);
                return false;
            }
        }
        const updatePost= async({title,slug,content,featuredImage,status,userID})=>{
            try{
                return await this.database.updateDocument({
                    databaseId:config.appWriteDatabaseId,
                    collectionId:config.appWriteCollectionId,
                    documentId:slug,
                    data:{title,content,featuredImage,status,userID}                
                })
            }catch(err){
                console.log(err);
                return false;
            }
        }
        const deletePost= async({slug})=>{
            try {
                await this.database.deleteDocument({
                    databaseId:config.appWriteDatabaseId,
                    collectionId:config.appWriteCollectionId,
                    documentId:slug
                })
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        const getPosts=async(slug)=>{
            try {
                await this.database.getDocument({
                    databaseId:config.appWriteDatabaseId,
                    collectionId:config.appWriteCollectionId,
                    documentId:slug
                })
            } catch (error) {
                console.log(error)
                return false;
            }
        }
        const listposts=async(query=[Query.equal('status', 'true')])=>{
            try {
                return await this.database.listDocuments({
                    databaseId:config.appWriteDatabaseId,
                    collectionId:config.appWriteCollectionId,
                    queries:query
                })
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        const uploadFile=async(file)=>{
            try {
                return await this.storage.createFile({
                    bucketId:config.appWriteBucketId,
                    fileId:ID.unique(),
                    file:file
                })
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        const deleteFile=async(fileId)=>{
            try {
              return await this.storage.deleteFile({
                bucketId:config.appWriteBucketId,
                fileId:fileId
              })               
            } catch (error) {
                console.log(err);
                return false;
            }
        }
        const getFilePreview=(fileId)=>{
            try {
                return this.storage.getFilePreview({
                    bucketId:config.appWriteBucketId,
                    fileId:fileId
                })
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}
const DatabaseStorageService=new DatabaseStorage();
export default DatabaseStorageService;