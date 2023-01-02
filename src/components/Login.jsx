import {useState, useEffect} from 'react'
import apiClient from '../services/apiClient'
import {useDispatch, useSelector} from 'react-redux';
import {setUserToken, setCredentials} from '../redux/reducers/auth'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {userToken} = useSelector((state)=> state.auth);


    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser({email: email, password: password})
        
    }
    const loginUser = async (credentials) =>{
        await apiClient.post('/api/auth/signin', credentials)
        .then((data)=>{
            console.log(data);
            if(data.data.auth===true){
                localStorage.setItem('userToken', data.data.accessToken);
                setError('');
                console.log('true login successful')
                dispatch(setUserToken(data.data.accessToken));
                dispatch(setCredentials({
                    name: data.data.userInfo.name,
                    email: data.data.userInfo.email
                }));
            } else{
                setError('Invalid email or password.')
                console.log('login failed')
                // return data;
            }
        })
        .catch((error) => {
            setError('Invalid email or password.')
            return error;
        })
    }
    useEffect(()=>{
        if(userToken) {
            navigate('/');
        }
    }, [userToken, error, navigate])
    return (
        <div>
            <div>Login</div>
            {(error) && (
                <div>
                    <div>{error}</div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>

    )
}
