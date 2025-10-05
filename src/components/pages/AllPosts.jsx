import React, {useState,useEffect} from "react"
import Container from "../container/Container"
import {PostForm} from '../index.js'
import DatabaseStorageService from '../../appwrite/conf.js'
function AllPosts(){
    const [posts,setPosts]=useState([]);
    DatabaseStorageService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }

    })
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                   {
                    posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostForm {...post} />
                    </div>                      
                    })
                   }
                </div>
            </Container>
        </div>
    )
}
export default AllPosts;