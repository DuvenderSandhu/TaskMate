import {useState} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../State/index'
function Login(){
  let user = useSelector(state => state.user)

  const router = useRouter();
const dispatch = useDispatch();
   
  const [username, setUsername] = useState('')
  const [password,setPassword]=useState('')
    let data={
      username:username,
      password:password,
      
    }
  const getData=async function(e){
    e.preventDefault()
    let res= await fetch('https://taskmate.moviesmovies.repl.co/api/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let finaldata=await res.json()
    if(finaldata.success){
      dispatch(actionCreators.changeuser(finaldata.token))
      console.log(finaldata.token)
      dispatch(actionCreators.alert({type:"success",message:finaldata.success}))
      router.push('/')
    }
    else{
      dispatch(actionCreators.alert({type:"alert",message:finaldata.alert}))

    }
  }
  return (
    <div>
     
     
      <form onSubmit={getData}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
            <h2 className="text-3xl font-semibold mb-4">Login</h2>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login