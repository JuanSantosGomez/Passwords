import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import {faGoogle} from '@fortawesome/free-brands-svg-icons'

import { useEffect, useState } from 'react';

import axiosInstance from './axios';

function App() {

  const [Alist, setAlist] = useState(

    []

  )
 
  const [authenData, setAuthenData] = useState({
    username:'',
    password:'',
  })
  // const objecs = [
  //   { id:1,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:2,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:3,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:4,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:5,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:6,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:7,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
  //   { id:8,
  //     name:"Google",
  //     website:"https://www.google.com",
  //     username:"Marco",
  //     email:"marco22@gmail.com"
  //   },
    
  // ]
  const baseURL = 'http://192.168.254.116:8000/api/'
  
  const [invert, setInvert] = useState(false)

  const backtotop = () => {
    setAlist([])
    setAuthenData([{
      username:'',
      password:'',
    }])
    document.getElementById("userform").value=""
    document.getElementById("passwordform").value=""

    logout()

    window.scrollTo(0,0)
  }

  

  useEffect(() => {
    var input = document.getElementById("passwordform");

    const triggerbtn = (event) => {
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('loginBtn').click();
      }
    }
      const onScroll = () => {
      if (window.scrollY>document.getElementById('banner').offsetHeight-50){ 
        setInvert(true)  
        if (window.scrollY<document.getElementById('banner').offsetHeight){ 
          window.scrollTo(0,document.getElementById('banner').offsetHeight)
        }

      }
      if (window.scrollY<=document.getElementById('banner').offsetHeight-50){ 
        setInvert(false)  
        backtotop()
        
      }
    }
    window.addEventListener("scroll", onScroll);
    input.addEventListener("keyup", triggerbtn);

    return () => { window.removeEventListener("scroll", onScroll); 
    input.removeEventListener("keyup", triggerbtn);
  } 
  });

  
  

	const getItems = () => {
   
		axiosInstance.get("account/",{baseURL:baseURL,
      timeout:5000,
      headers: {
          Authorization: localStorage.getItem('access_token')
          ? "Bearer " + localStorage.getItem('access_token')
          : null,
          "Content-Type": "application/json",
          accept:"application/json",
      }

    }).then((res) => {
        const allPosts = res.data;
        setAlist(allPosts);
        console.log(res.data);
        
        setTimeout(() => {  backtobot() }, 200);
        
		})
	};

  const backtobot = () => {
    window.scrollTo(0,document.getElementById("banner").offsetHeight+10)
    
  }
  

  const login = (e) =>{

    
    handleSubmit(e);
    

  }

  const logCredentials = () =>{
    setAuthenData({
      username:document.getElementById("userform").value,
      password:document.getElementById("passwordform").value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axiosInstance.post(baseURL+`token/`,{
      username: authenData.username,
      password: authenData.password,
    }).then((res)=>{
      
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      
     
     
      

      getItems()
        
  
      
      
      
    })
  }

  const logout = () =>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

  }
  
  return (
    <div id="App" className="App overflow-hidden">
      <div className="flex flex-col bg-yellow-600 w-screen overflow-hidden">
        <div id="banner" className="flex flex-col justify-center h-screen w-screen overflow-hidden">


        <div className='h-48 w-48 m-auto flex flex-col justify-items-start'>
          <div className='flex flex-row justify-items-center text-black'><FontAwesomeIcon icon={faUser} className='h-6 ml-0 mt-3 mr-2'/><input onChange={logCredentials} id="userform" type="text" placeholder='Username' className='text-sm flex-shrink mb-3 bg-yellow-600 border-b-2 border-black p-2 min-w-0' /></div>
          <div className='flex flex-row justify-items-center text-black'><FontAwesomeIcon icon={faKey} className='h-6 ml-0 mt-3 mr-2'/><input onChange={logCredentials} id="passwordform" type="password" placeholder='Password' className='text-sm flex-shrink mb-10 bg-yellow-600 border-b-2 border-black p-2 min-w-0'/></div>
          <button id='loginBtn' type='submit' onClick={login}>
            <FontAwesomeIcon icon={faLockOpen} className='w-auto h-full' color="#f1f1f1"/>
          </button>
          
        </div>


        </div>

       
        
        <div className={`bg-yellow-600 flex flex-row h-10 ${invert? "propo":"topo"} border-gray-500 w-full fixed overflow-hidden `}>
          <div className="flex flex-row">
            <input placeholder='Search...' type="text" className='bg-gray-100 text-sm p-3' />
            <div className='w-11 bg-yellow-700 text-center'>
              <FontAwesomeIcon icon={faSearch} className=" w-auto h-full" size="lg" color="#f1f1f1"/>
            </div>
          </div>
          <div className="flex-grow">
          </div>
          <FontAwesomeIcon icon={faLock} onClick={backtotop} className="w-auto h-full ml-3 mr-5" size="lg" color="#f1f1f1"/>
        </div>
        
        {
          Alist.length>0?
        <div className="bg-gray-700 flex-grow flex flex-col min-h-screen w-full p-7">
          <div className='h-48'>

          </div>
          <table className='rounded-md bg-gray-800'>
              <tbody>
              {Alist.map(e=>{ return <AccountLister key={e.id} {...e} />
              })}
              </tbody>
          </table>
        </div>
        :
        ""
        }
      </div>
    </div>
  );
}

export default App;

let AccountLister = ({site,url,username,email,password}) => {
  
  

  return (
    <tr className='border-1  w-full overflow-hidden text-white'>
        <td className='p-2 bg-white icon' >
          <button onClick={()=>navigator.clipboard.writeText(password)}>
          <FontAwesomeIcon icon={faGoogle} color='#090909' />
          </button>
        </td>
        <td className='p-1'>
       
          <div className='font-bold mb-0 pb-0 bg-gray-800'>{site}</div>
          <div className='text-sm mt-0 pt-0 pb-3 mb-0 text-white'>{url}</div>
        </td>
        <td className='p-2 bg-gray-500 '>
          <div className='font-semibold text-sm mb-0 pb-0 text-white'>{username}</div>
          <div className='flex-grow font-semibold text-sm mb-0 pb-0 text-white'>{email}</div>
        </td>
        <td className='p-2 text-white bg-gray-600'>
        Last accessed
        </td>
  

    </tr>
  )
}



// let queryApp = () => {

  

// }