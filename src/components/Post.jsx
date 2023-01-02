import React, { useEffect } from 'react';
import Header from './partials/Header'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../redux/reducers/post'
const Post = () => {
    const dispatch = useDispatch();
    let {userToken} = useSelector((state)=> state.auth);
    const posts = useSelector((state) => state.post);
    useEffect(()=>{
        dispatch(fetchPost(userToken));
    }, [userToken, dispatch, posts])

    return (
        <div>
            <Header/>
            <h1>
                Posts
            </h1>
        </div>
    );
}

export default Post;
