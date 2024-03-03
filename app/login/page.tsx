"use client"
import { useState  } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Page() {

  const router = useRouter()

  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [getUserName, setUserName] = useState("panda");

  const login = () => {
    console.log('login');
    //router.push('/home', null, { shallow: true })
  }

  const handleUsernameChange = (val:any) => {
    let username = val.target.value.trim();
    const disabled = !username || username.length === 0;
    setLoginButtonDisabled(disabled);
    setUserName(username);
  }

  const handlePasswordChange = () => {
    console.log('change pw');
  }

  return (<div className="md:flex">
  
  <form className="w-full max-w-lg" onSubmit={login}>
    <div className="md:flex md:items-center mb-6 border-2 text-red-800 mt-2">
      Actual authentication is not implemented. The form accepts any username/pw. Username will be used to track creation of short URLs
    </div>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
        Username:
      </label>  
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        id="url" 
        placeholder="username"
        onChange={handleUsernameChange} />
      </div>
    </div>
    <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
          Password:
        </label>  
      </div>
      <div className="md:w-2/3">
        <input type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        id="url" 
        placeholder="password"
        onChange={handlePasswordChange} />
      </div>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-3/3">     
        <Link href={{ pathname: '/home', query: {"user":getUserName} }} className="linkDihover:bg-blue-300 bg-blue-400 focus:outline-none text-white font-bold py-1 px-4 rounded border-solid border-2">Login</Link>
    </div>
  </div>
</form>
</div>)
}
