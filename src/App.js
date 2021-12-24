import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'

import { useEffect, useState } from 'react';

import jwt from 'jwt-decode'
import axiosInstance from './axios';

const baseURL = 'http://localhost:8000/api/'


function App() {
  axiosInstance.defaults.xsrfCookieName = 'csrftoken'
  axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken'

  const [loggedUser,setLoggedUser] = useState(null)
  const [Alist, setAlist] = useState([])
  const [authenData, setAuthenData] = useState({username:'',password:'',})
  const [invert, setInvert] = useState(false)
  const [addAcc, setAddAcc] = useState(false)
  const [submitData, setSubmitData] = useState({
    site:'',
    url:'',
    username:'',
    email:'',
    password:''
  })

  //Log Button Handlers

  const logout = () => {
    setAddAcc(false)
    resetForms()
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setLoggedUser(null)
    backtotop()
  }
  const login = (e) => {
    e.preventDefault();
    removeClass("loginBtn","shaker")
    requestToken();
  }
  const resetForms = () => {
    setAlist([])
    setAuthenData([{
      username:'',
      password:'',
    }])
    document.getElementById("userform").value=""
    document.getElementById("passwordform").value=""
  }


  // Event Listeners here
  useEffect(() => {
    var input = document.getElementById("passwordform");
    const triggerbtn = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
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
        logout()
      }
    }
    window.addEventListener("scroll", onScroll);
    input.addEventListener("keyup", triggerbtn);

    return () => { 
      window.removeEventListener("scroll", onScroll); 
      input.removeEventListener("keyup", triggerbtn);
    } 
  });

  // Event Handlers

  const logCredentials = () => {
    setAuthenData({
      username:document.getElementById("userform").value,
      password:document.getElementById("passwordform").value
    })
  }
  const logSubmit = () => {
    setSubmitData({
      site:document.getElementById('sitesubmit').value,
      url:document.getElementById('urlsubmit').value,
      username:document.getElementById('usernamesubmit').value,
      email:document.getElementById('emailsubmit').value,
      password:document.getElementById('passwordsubmit').value
    })
    
  }

  // Scroll Functions

  const backtobot = () => {
    setTimeout(() => {
      window.scrollTo(0,document.getElementById("banner").offsetHeight+10)
    }, 200);
    removeClass("div1","anim1")
    removeClass("div2","anim2")
    removeClass("loginBtn","anim3")

  }
  const backtotop = () => {
    window.scrollTo(0,0)
    toggler("div1","anim1")
    toggler("div2","anim2")
    toggler("loginBtn","anim3")
  }
  


  // HTTP Requests

  const requestToken = () => {
    axiosInstance.post(baseURL+`token/`,{
      username: authenData.username,
      password: authenData.password,
    }).then((res)=>{
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      
      setLoggedUser(jwt(res.data.access,'sikrit').user_id)

      requestItems()    
    }).catch((err)=>{
      resetForms()
      buttonshake()
    })
  }
  const requestItems = () => {
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
      setAlist(res.data);
      backtobot() 

		}).catch((err)=>{
      buttonshake()
    })
	}
  const requestDelete = (item) => {
    
    axiosInstance.delete("account/"+item+"/",{baseURL:baseURL,
      timeout:5000,
      headers: {
          Authorization: localStorage.getItem('access_token')
          ? "Bearer " + localStorage.getItem('access_token')
          : null,
        
          
      }
    }
    ).then(()=>{
      requestItems()
    }).catch((err)=>console.log(err.response.data))
  }
  const postItems = (e) => {
    e.preventDefault()
    removeClass("addBtn","shaker")

    const abody= JSON.stringify({
      site:submitData.site,
      url:submitData.url,
      username:submitData.username,
      email:submitData.email,
      description:"",
      password:submitData.password,
      user:loggedUser
    })
    
    axiosInstance.post("account/",abody,{baseURL:baseURL,
      timeout:5000,
      headers: {
          Authorization: localStorage.getItem('access_token')
          ? "Bearer " + localStorage.getItem('access_token')
          : null,
          'Content-Type': 'application/json'
         
      },
      
    }).then(()=>{
      setAddAcc(false)
      requestItems()
      

    }).catch((err)=>{console.log(err.response.data)
    toggler("addBtn","shaker")
    })
  }

  // Button animation

  const buttonshake = () =>{
    toggler("loginBtn","shaker")
  }

  // document toggler

  const removeClass = (id,classu) =>{
    document.getElementById(id).classList.remove(classu)
  }
  const toggler = (id,classu) => {
    document.getElementById(id).classList.add(classu)
  }
  
  
  return (
    <div id="App" className="App overflow-hidden bg-gray-700">
      <div className="flex flex-col bg-yellow-600 w-full overflow-hidden">
        <div id="banner" className="flex flex-col justify-center h-screen w-full overflow-hidden">


        <div className='h-48 w-48 m-auto flex flex-col justify-items-start'>
          <form action="">
          <div id="div1" className='anim1 flex flex-row justify-items-center text-white border-nan border-blue-600 pl-4 pr-4 mb-3'><FontAwesomeIcon icon={faUser} size="lg" className='h-6 ml-0 mt-2 mr-3 w-20'/><input autoComplete='false' onChange={logCredentials} id="userform" type="text" placeholder='Username' className='text-sm flex-shrink bg-gray-50 p-2 min-w-0 text-black' /></div>
          <div id="div2" className='anim2 flex flex-row justify-items-center text-white border-nan border-blue-600 pl-4 pr-4 mb-10'><FontAwesomeIcon icon={faKey} size="lg" className='h-6 ml-0 mt-2 mr-2 w-20'/><input autoComplete='false' onChange={logCredentials} id="passwordform" type="password" placeholder='Password' className='text-sm flex-shrink bg-gray-50 p-2 min-w-0 text-black'/></div>
          <button id='loginBtn' className='anim3 logger' type='submit' onClick={login}>
            <FontAwesomeIcon icon={faLockOpen} className='w-auto h-full' color="#f1f1f1"/>
          </button>
          </form>
        </div>


        </div>

       
        
        <div className={`bg-yellow-600 flex flex-row h-10 ${invert? "propo":"topo"} border-gray-500 w-s w-full fixed top-0 overflow-hidden `}>
          {/* <div className="flex flex-row">
            <input placeholder='Search...' type="text" className='bg-gray-100 text-sm p-3 text-white' />
            <div className='w-11 bg-yellow-700 text-center'>
              <button className=" w-auto h-full"> 
              <FontAwesomeIcon icon={faSearch}  size="lg" color="#f1f1f1"/>
              </button> 
            </div>
          </div> */}
          <div className="flex-grow justify-center h-full">
            <button onClick={logout} className='h-full'>
            <FontAwesomeIcon icon={faLock}  className="w-auto m-auto h-full ml-3 mr-5" size="lg" color="#f1f1f1"/>
            </button>
          </div>
          
        </div>
        
        {
          loggedUser?
        <div className="bg-gray-700 max-h-screen overflow-hidden flex flex-col min-h-screen w-full">
          <div className='overflow-y-auto h-screen m-auto w-scree'>
          <div className='h-48'>

          </div>
          <table className='rounded-md bg-gray-800 m-auto'>
              <tbody>
              {Alist.map(e=>{ return <AccountLister reqdel={requestDelete} key={e.id} {...e} />
              })}
              </tbody>
          </table>

          <div className='h-48'>

          </div>
          </div>
          <div className={`anim4 fixed h-10 bottom-0 ${!addAcc? "propo ":"topor "}flex w-full justify-center`}>
          
          { addAcc?
          <div className='w-full border-t-2 bg-gray-700 border-gray-500'>
          <div className='anim4 w-full h-6 bg-gray-700 text-center hover:bg-white diviser' onClick={()=>{setAddAcc(false); setSubmitData({});}}>
            <FontAwesomeIcon className='icot' icon={ faCaretDown } color='white'/>
          </div>
            <form className='anim4 flex flex-col w-full p-10 bg-gray-700'>
              
              <div className='detailform'><input onChange={logSubmit} placeholder='Site Name' id='sitesubmit' type="text" /></div>
              <div className='detailform'><input onChange={logSubmit} placeholder='Site URL' id='urlsubmit' type="text" /></div>
              <div className='detailform'><input onChange={logSubmit} placeholder='Username' id='usernamesubmit' type="text" /></div>
              <div className='detailform'><input onChange={logSubmit} placeholder='Email' id='emailsubmit' type="text" /></div>
              <div className='detailform'><input onChange={logSubmit} placeholder='Password' id='passwordsubmit' type="password" /></div>

            <div><button id="addBtn" onClick={postItems} className='p-1 logger'><FontAwesomeIcon color='white' size='lg' icon={faPlusSquare}/></button></div>

            </form>
            </div>
          :
          <button onClick={()=>{setAddAcc(true); setSubmitData({});}} className='text-white bg-gray-700 w-full hover:bg-white hover:text-black'>
            + Add Account
          </button>
          }
          </div>
        </div>
        :
        ""
        }
        
      </div>
    </div>
  );
}



export default App;

let AccountLister = ({reqdel,id,site,url,updated,username,email,password}) => {
  const [sure,setSure] = useState(false)
  const [copied,setCopied] = useState(false)

  const copyme = () => {
    
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(()=>{setCopied(false)},1200)
    
  }

  return (
    
    sure?
    <tr className='anim4 border-1 w-full h-14 overflow-hidden bg-red-700 text-white'>
      
      <td colSpan={4}>
        Deleting<span className='font-bold'> {site}</span>. Are you sure?
      </td>
      <td className='h-16'>
      <button className='hover:text-gray-900 h-16 hover:bg-white p-x' onClick={()=>{ reqdel(id) }}> Yes </button>
      <button className='hover:text-gray-900 h-16 hover:bg-white p-x' onClick={()=>{setSure(false)}}> No </button>
      </td>
    </tr>
    :
    copied?
    <tr className='anim4 font-bold border-1 w-full h-14 overflow-hidden bg-gray-200 text-white'>
      
    <td colSpan={10} style={{minWidth:360}}>
      Password obtained
      </td>
    </tr>
    :
    <tr className='anim4 border-1 rower w-full overflow-hidden colorgray'>
        <td onClick={copyme} className='p-x bg-white icon' >
          
          <FontAwesomeIcon icon={faGoogle} color='#090909' />
        
        </td>
        <td onClick={copyme} className='p-x overflow-ellipsis overflow-hidden'>
       
          <div className='font-bold mb-0 pb-0'>{site}</div>
          <div className='text-sm mt-0 pt-0 pb-1 mb-0'>{url}</div>
        </td>
        <td onClick={copyme} className='p-x bg-gray-500 overflow-ellipsis overflow-hidden'>
          <div className='font-semibold text-sm mb-0 pb-0'>{username}</div>
          <div className='flex-grow font-semibold text-sm mb-0 pb-0'>{email}</div>
        </td>
        <td onClick={copyme} className='p-x bg-gray-600 overflow-ellipsis overflow-hidden'>
        {updated}
        
        </td>
        <td className='p-x'>
          
          <button className='mr-2'><FontAwesomeIcon icon={faEdit}/></button>
          <button onClick={()=>{setSure(true)}}><FontAwesomeIcon icon={faTrash}/></button>

        </td>
  

    </tr>
    
  )
}