import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../redux/reducers/post';
import apiClient from '../services/apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './partials/Header';

const EditPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const post = useSelector((state) => state.post.posts.find((p)=>{
        if(p.id == id) return p;
    }));
    console.log(post.title);
    console.log(id);
    const { userToken } = useSelector((state)=> state.auth);

    const [data, setData] = useState({
        title: post.title,
        desc: post.desc,
    });

    const [error, setError] = useState('');

    const onChanged = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const onSave = () => {
        if(!data.title || !data.desc) return setError('Please enter a title and desc');
        apiClient.put(`/api/post/${id}`, {id: id, title:data.title, desc:data.desc}, {
            headers: {
                'x-access-token': userToken
            }
        })
        .then((response)=>{
            if(response.data.status === 'success'){
                dispatch(updatePost(response.data.data))
                setData({title: '', desc: ''});
                navigate(`/post/`)
                
            }
        })
    }
    return (
        <div>
            <Header/>
            <h2>Edit Post</h2>
            {(error) && (error)}
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={onChanged}
                    />
                </div>
                <div>
                    <label htmlFor="desc">Desc</label>
                    <input
                        type="text"
                        id="desc"
                        name="desc"
                        value={data.desc}
                        onChange={onChanged}
                        />
                </div>
                <div>
                    <button type="button" onClick={onSave}>Submit</button>
                </div>
                </form>
        </div>
    );
}

export default EditPost;
