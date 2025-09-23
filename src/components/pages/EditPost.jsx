import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DatabaseStorageService from "../../appwrite/conf.jsx"
import PostForm from '../../post-form/PostForm';
const EditPost = () => {
  const [post,setPosts]=useState(null);
  const {slug}=useParams();
  const navigate=useNavigate();
  useEffect(()=>{
    if(slug){
      DatabaseStorageService.getPost(slug).then((post)=>{
        if(post){
            setPosts(post)
        }
      })
    }else{
        navigate('/')
    }
  },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost