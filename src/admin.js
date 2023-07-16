import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
function Admin() {
    const [user, setUser] = useState(null);
    const [admins1,setadmins1] = useState(null);
    const [isadmin1, setisadmin1] = useState(true);
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
    const onsubmit = ()=>{

    }
    useEffect(() => {
      axios
        .get('https://internle-blogbackend.onrender.com/api/admins/')
        .then(response => {
          const data = response.data;
          // setCompanyData(data);
          setadmins1(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);
    useEffect(()=>{
      if (admins1!=null && user!=null){
      // console.log(String(user.email) in admins);
      // console.log(admins);
      var adminstemp = admins1;
      // setisadmin(true);
      // console.log(typeof admins.admins[0]);
      // console.log(admins.length);
      var count = 0;
      for (var i = 0; i < admins1.admins.length; i++) {
        // console.log("hello");
        if (String(admins1.admins[i]) !== String(user.email)) {
          // console.log(user.email);
          count+=1;
          // setisadmin1(true);
          // break; // Exit the loop once a match is found
        }
        // console.log(typeof user.email);
        // console.log(typeof admins[i]);
      }
      if (count==admins1.admins.length){
        setisadmin1(false);
      }
    }
      // console.log(adminstemp);
    },[admins1,user])
    useEffect(()=>{
      if (isadmin1){
        return;
      }
      var temptemp = isadmin1;
      // console.log(isadmin1);
      if (!isadmin1){
        navigate("/404");
        // console.log("navigate not working");
      }
    },[isadmin1])
    if (!admins1) {
      return (
        <div style={{ width: '100vw', backgroundColor: 'rgba(7,17,60,255)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loader">
            <div className="loader-circle"></div>
            <span className="loader-text">Loading...</span>
          </div>
        </div>
      );
    }


    // import axios from 'axios';

  // Make sure to replace the URL with the actual endpoint URL
  const addPostsEndpoint = 'https://internle-blogbackend.onrender.com/api/posts/';

  const addPost = () => {
    // Create the data object containing the post details
    try{
    if (document.getElementById("blog-title").value=="" || document.getElementById("blog-description").value=="" || document.getElementById("imagelink").value=="" || document.getElementById("blog-theme").value==""|| document.getElementById("blogvideolink").value==""){
      return;
    }
    }catch(error){
      console.log(error);
    }
    const postData = {
      title: document.getElementById("blog-title").value,
      description: document.getElementById("blog-description").value,
      img: document.getElementById("imagelink").value,
      category: document.getElementById("blog-theme").value,
      video: document.getElementById("blogvideolink").value
    };

    axios
      .post(addPostsEndpoint, postData)
      .then(response => {
        console.log(response.data); // "POST CREATED!"
      document.getElementById("blog-title").value="";
      document.getElementById("blog-description").value="";
      document.getElementById("imagelink").value="";
      document.getElementById("blog-theme").value="";
      document.getElementById("blogvideolink").value="";
        // Handle any further actions after successful response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error cases
      });
  };

  return (
    <div style={{overflowY:'scroll'}}>
        <div style={{width:'100vw',height:'300px',backgroundColor:'222831',borderTopRightRadius:'30px',borderTopLeftRadius:'30px',display:'flex',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}}>
            <img src='./Titleopoclogo2.png' style={{width:'400px',marginLeft:'50px'}}></img>
            <h1 style={{color:'white',fontSize:'3em',marginRight:'50px',fontFamily:'monospace'}}>Welcome Admin</h1>
        </div>
        <center>
        <div style={{width:"98vw",backgroundColor:"#393E46",borderRadius:'30px',marginBottom:'50px'}}>
            <br></br>
            <br></br>
            <h2 style={{color:'white',textAlign:'left',marginLeft:'30px'}}>Enter Blog Title:</h2>
            <br></br>
            <input id='blog-title' type='text' style={{height:'40px',width:'90%',borderRadius:'20px',border:'none'}} placeholder='   Title' required></input>
            <br></br>
            <br></br>
            <h2 style={{color:'white',textAlign:'left',marginLeft:'30px'}}>Enter Blog Content:</h2>
            <br></br>
            <textarea id='blog-description' type='text' style={{height:'100px',width:'90%',borderRadius:'10px',border:'none',fontSize:'20px'}} spellCheck={false}  required></textarea>
            <br></br>
            <br></br>
            <br></br>
            <input id='blogvideolink' type='text' style={{height:'40px',width:'90%',borderRadius:'10px',border:'none',fontSize:'20px'}} placeholder='Video link' required></input>
            <br></br>

            <br></br>
            <input id='imagelink' type='text' style={{height:'40px',width:'90%',borderRadius:'10px',border:'none',fontSize:'20px'}} placeholder='Image link' required></input>
            <br></br>
            <br></br>
            <input id='blog-theme' type='text' style={{height:'40px',width:'90%',borderRadius:'10px',border:'none',fontSize:'20px'}} placeholder='Theme' required></input>
            <br></br>
            <br></br>

            <center><h1 id='submit' onClick={addPost} style={{cursor:'pointer',padding:'10px',borderRadius:'5px',marginBottom:'100px',backgroundColor:'#00ADB5',color:'white',width:'250px'}} >Submit Blog</h1></center>
            <br></br>
            <br></br>
            <br></br>
        </div>
        </center>

    </div>
  )
}

export default Admin;