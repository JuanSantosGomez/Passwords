import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


import {faGoogle} from '@fortawesome/free-brands-svg-icons'

import { useEffect, useState } from 'react';


function App() {

  const [Alist, setAlist] = useState(

    [
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
      {
        name:"Google",
        website:"https://www.google.com",
        username:"Marco",
        email:"marco22@gmail.com"
      },
    ]

  )

  
  const [invert, setInvert] = useState(false)


  

  useEffect(() => {
      const onScroll = () => {
      if (window.scrollY>document.getElementById('banner').offsetHeight-50){ 
        setInvert(true)  
        if (window.scrollY<document.getElementById('banner').offsetHeight){ 
          window.scrollTo(0,document.getElementById('banner').offsetHeight)
        }

      }
      if (window.scrollY<=document.getElementById('banner').offsetHeight-50){ 
        setInvert(false)  
        window.scrollTo(
          0,
          0
        )
        
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  


  useEffect(() => {
    fetch('http://127.0.0.1:8000/passwords/account', { 
      method: 'get', 
      credentials: 'include',
      crossDomain: true,
      headers: new Headers({
        
        'Authorization': 'Basic '+btoa(`${'popotses'}:${'qweqweqwe'}`)
        ,'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      })
      
    }
    ).then((response) => {
      if (response.ok){
        response.json()
      }
      else{
        throw response
      }
    })
    .then((responseData) => {
      console.log(responseData);
    }).catch(error => {
      console.error("Error fetching data:",error)
    }).finally()
    
  }, [])

  const backtobot = () => {
    window.scrollTo(0,document.getElementById("banner").offsetHeight+10)
    
  }
  const backtotop = () => {
    window.scrollTo(0,0)
    
  }
  return (
    <div id="App" className="App overflow-hidden">
      <div className="flex flex-col bg-yellow-600 w-screen overflow-hidden">
        <div id="banner" className="flex flex-col justify-center h-screen w-screen overflow-hidden">


        <div className='h-48 w-48 m-auto flex flex-col justify-items-start'>
          <div className='flex flex-row justify-items-center text-black'><FontAwesomeIcon icon={faUser} className='h-6 ml-0 mt-3 mr-2'/><input type="text" placeholder='Username' className='text-sm flex-shrink mb-3 bg-yellow-600 border-b-2 border-black p-2 min-w-0' /></div>
          <div className='flex flex-row justify-items-center text-black'><FontAwesomeIcon icon={faKey} className='h-6 ml-0 mt-3 mr-2'/><input type="password" placeholder='Password' className='text-sm flex-shrink mb-10 bg-yellow-600 border-b-2 border-black p-2 min-w-0'/></div>
          <button onClick={backtobot}>
            <FontAwesomeIcon icon={faLockOpen} className='w-auto h-full' color="#f1f1f1"/>
          </button>
        </div>


        </div>

        
        
        <div className={`bg-yellow-600 flex flex-row h-10 ${invert? "propo":"topo"} border-gray-500 w-full fixed overflow-hidden `}>
          <div className="flex flex-row">
            <input placeholder='Search...' type="text" className='bg-gray-100 text-sm p-3' />
            <div className='w-11 bg-yellow-700 text-center'>
              <FontAwesomeIcon icon={faSearch} className=" w-auto h-full" size="md" color="#f1f1f1"/>
            </div>
          </div>
          <div className="flex-grow">
          </div>
          <FontAwesomeIcon icon={faLock} onClick={backtotop} className="w-auto h-full ml-3 mr-5" size="lg" color="#f1f1f1"/>
        </div>
        

        <div className="bg-gray-700 flex-grow flex flex-col w-full p-7">
          <div className='h-48'>

          </div>
          <table className='rounded-md bg-gray-800'>
              {Alist.map(e=>{ return <AccountLister key={e} {...e} />
              })}
          
          </table>
        </div>
        
      </div>
    </div>
  );
}

export default App;

let AccountLister = ({name,website,username,email}) => {
  return (
    <tr className='border-1  w-full overflow-hidden text-white'>
        <td className='p-2 bg-white icon'>
          <FontAwesomeIcon icon={faGoogle} color='#090909' />
        </td>
        <td className='p-1'>
       
          <div className='font-bold mb-0 pb-0 bg-gray-800'>{name}</div>
          <div className='text-sm mt-0 pt-0 pb-3 mb-0 text-white'>{website}</div>
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