import { useEffect, useState } from 'react';
import Header from './partials/Header'
import { useDispatch, useSelector } from 'react-redux';
import { setAllPost, addPost as addNewPost, deletePost } from '../redux/reducers/post'
import apiClient from '../services/apiClient';
import { Link } from 'react-router-dom'


const Post = () => {
    const dispatch = useDispatch();
    let {userToken} = useSelector((state)=> state.configAuth);
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

    const [isAddPost, setAddPost] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');

    const addPost = () => {
        // e.preventDefault();
        apiClient.post('/api/post',{title: title, desc: desc},{
            headers: {
                'x-access-token': userToken
            }
        })
        .then((response)=>{
            console.log(response);
            setAddPost(false);
            setTitle('');
            setDesc('');
            dispatch(addNewPost(response.data.data));
        })
    }

    const isForm = () => {
        setAddPost(!isAddPost);
    }

    const onDelete = (id) => {
        apiClient.delete(`/api/post/${id}`,{
            headers: {
                'x-access-token': userToken
            }
        })
        .then((response)=>{
            dispatch(deletePost(id))
        })

    }

    const {posts} = useSelector((state) => state.configPost);
    useEffect(()=>{
        console.log('success')
    },[posts, userToken, isAddPost, title, desc]);
    return (
        <div>
            <Header/>
            <h1>
                Posts
            </h1>
            <button onClick={isForm}>Add Post</button>
            {isAddPost ? <div>
                <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Desc</label>
                    <input
                        type="desc"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        />
                </div>
                <div>
                    <button type="button" onClick={addPost}>Submit</button>
                </div>
                </form>
            </div> : null}
            {
            (posts.length > 0) ?
            posts.map((post, index)=>{
                return(
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <p>author by: {post.User.name}</p>
                    <Link to={`/post/${post.id}`}>edit</Link>
                    <br />
                    <Link onClick={()=>onDelete(post.id)}>delete</Link>
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
