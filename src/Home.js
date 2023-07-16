import React from 'react'
import "./home.css"
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
function Home() {
    const [user, setUser] = useState(null);
    const [admins,setadmins] = useState(null);
    const [isadmin, setisadmin] = useState(false);
    // const [stopload,setstopload] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        // User is signed in
        setUser(user);
        // console.log(user);
        // navigate("/companies"); // Redirect to the "/companies" page
      } else {
        // User is signed out
        setUser(null);
        navigate("/");
      }
      
    });

    return () => {
      unsubscribe();
      
    };
  }, []);

  useEffect(() => {
    axios
      .get('https://internle-blogbackend.onrender.com/api/admins/')
      .then(response => {
        const data = response.data;
        // setCompanyData(data);
        setadmins(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  

  // clearTimeout(timer)
  const logOut = async () => {
    try {
    await signOut(auth);
    navigate("/")
    } catch (err){
      console.error(err);
    }
  }  
  useEffect(()=>{
    if (admins!=null && user!=null){
    // console.log(String(user.email) in admins);
    // console.log(admins);
    var adminstemp = admins;
    // setisadmin(true);
    // console.log(typeof admins.admins[0]);
    // console.log(admins.length);
    for (var i = 0; i < admins.admins.length; i++) {
      if (String(admins.admins[i]) === String(user.email)) {
        setisadmin(true);
        break; // Exit the loop once a match is found
      }
      // console.log(typeof user.email);
      // console.log(typeof admins[i]);
    }
  }
    // console.log(adminstemp);
  },[admins,user])
  useEffect(()=>{
    if (!isadmin){
      return;
    }
    var temptemp = isadmin;
  },[isadmin])
  if (!admins) {
    return (
      <div style={{ width: '100vw', backgroundColor: 'rgba(7,17,60,255)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader">
          <div className="loader-circle"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div style={{width:'100vw',height:'100vh',overflowY:'scroll',backgroundImage:"url('https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2018/11/dark-wallpapers.jpg')"}}>
      <div className='homenav' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <img style={{width:'300px',marginTop:'30px',marginLeft:'30px'}} src='./Titleopoclogo2.png'></img>
        <ul style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap',alignItems:'center',width:'80%',color:'white',listStyleType:'none'}}>
          <li  style={{margin:'10px'}}><a href='/chat' >Discuss</a></li>
          <li  style={{margin:'10px'}}><a href='/blog' >Blog</a></li>
          <li  style={{margin:'10px'}}><a href='/companies'  >Companies</a></li>
          <li  style={(isadmin)?{margin:'10px'}:{display:'none'}}><a href='/admin'>Admin</a></li>
          
          <li style={{margin:'10px',cursor:'pointer'}}  onClick={logOut}><a>Sign Out</a></li>
        </ul>

      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap'}}>
      
      <div>
      <div style={{marginTop:'20%',marginLeft:'50px'}}>
        {/* <br></br>
        <br></br>
        <br></br>
        <br></br> */}
        <center>
        <h1 style={{fontSize:'3em',color:"white"}}>FRUSTATED WITH FINDING JOBS</h1>
        <h1 style={{fontSize:'3em',marginTop:'30px',color:'white'}}>TRY OPOC</h1>
        </center>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center><a href='/companies' style={{color:"white",textDecoration:'none'}}><h1 style={{color:"black",backgroundColor:'white',borderRadius:'30px',height:'40px',width:'300px',fontSize:'1.2em',textAlign:'center',paddingTop:'10px',cursor:"pointer"}}>Explore Job Openings</h1></a></center>
      </div>
      {/* <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'flex-start',width:'40%',height:'70vh'}}>
        <img style={{width:'350px',borderRadius:'40px',marginTop:'100px'}} src='https://media.istockphoto.com/id/1479521216/vector/happy-businessman-sitting-at-desktop-and-working-vector-illustration-office-work-job.jpg?s=612x612&w=0&k=20&c=AySV96nSmaOhekHvGoHqKSZNSdhwQ2-RP7R6d9Krva4='></img>
      </div> */}
    </div>
    </div>
  )
}

export default Home