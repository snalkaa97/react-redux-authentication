import { useEffect } from 'react';
import Header from './partials/Header'
import { useDispatch, useSelector } from 'react-redux';
import { setAllPost } from '../redux/reducers/post'
import apiClient from '../services/apiClient';
const Post = () => {
    const dispatch = useDispatch();
    let {userToken} = useSelector((state)=> state.auth);
    useEffect(()=>{
        (async ()=> {
            await apiClient.get('/api/post',{
                headers:{
                    'x-access-token': userToken
                }
            })
            .then((response)=>{
                dispatch(setAllPost(response.data.data));
            })
        })()
    }, [])
    const posts = useSelector((state) => state.post.posts);
    useEffect(()=>{
    },[posts, userToken]);
    return (
        <div>
            <Header/>
            <h1>
                Posts
            </h1>
            {
            (posts.length > 0) ?
            posts.map((post, index)=>{
                return(
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <p>author by: {post.User.name}</p>
                </div>
                )
            }): (
                <div>
                    <h2>No posts</h2>
                </div>
            )}
        </div>
    );
}

export default Post;
