import React from 'react'
import "./Error404.css"
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
function Error404() {
    const [user, setUser] = useState(null);
  const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            setUser(user);
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
  return (
    <div id='lift-main-box' style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh'}}>
            <div style={{width:'370px',height:'450px',borderStyle:'solid',borderColor:'white',borderBottomWidth:'1px',backgroundColor:'#232323'}}>
                <br></br>
                <center><div style={{width:'70px',height:'40px',borderStyle:'solid',borderColor:'white'}}><h1 style={{fontFamily:'fantasy',fontSize:'18px',textAlign:'center',color:'#36b079',paddingTop:'8px'}}>404</h1></div></center>
                <br></br>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                <div className='jc-doors' style={{width:'260px',height:'370px',marginLeft:"40px",borderStyle:'solid',borderColor:'white',borderBottomWidth:'1px'}}>
                    {/* <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br> */}
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div id='left-door'></div>
                    
                        <div id='right-door'></div>
                    </div>
                    <div style={{marginTop:'-100%'}}>
                    <center><h1 style={{color:'white'}}>Oops ...</h1></center>
                    <br></br>
                    {/* <center><h1 style={{color:'white'}}>Wrong Floor</h1></center> */}
                    {/* <br></br> */}
                    <center><h1 style={{color:'white' ,fontSize:'20px'}}>Something's Not Right</h1></center>
                    <br></br>
                    {[0].map((item,index)=>{
                      if (window.self!==window.top){
                        return(<div key={index}><center><h1 style={{color:'white',fontSize:'20px'}}>No Video</h1></center></div>);
                      }else{
                        return(<div key={index}><center><h1 style={{color:'white',fontSize:'20px'}}>Wrong Floor</h1></center></div>);
                      }
                    })}
                    
                    </div>
                </div>
                <div style={{width:'40px',height:'60px',borderStyle:'solid',borderColor:'white',borderBottomWidth:'1px',marginTop:'-40px', display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>
                    <a href='/home' id='up-button-lift'></a>
                    <a href='/blog' id='down-button-lift'></a>
                </div>
                </div>


            </div>
    </div>
  )
}

export default Error404