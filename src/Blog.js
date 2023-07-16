import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./blog.css"
import "./App.css"
import axios from 'axios';
function Blog() {
    const [user, setUser] = useState(null);
    const [words,setwords] = useState("");
    const [theme,settheme] = useState("Theme");
    const [blodid,setblogid] = useState(null);
    const [admins1,setadmins1] = useState(null);
    const [isadmin1, setisadmin1] = useState(true);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  // const [editabletitle,seteditabletitle] = useState("");
  // const [editabledescription,seteditabledescription] = useState("");
  
  // const [editabledescription,seteditabledescription]
  const fetchData = async () => {
    try {
      const response = await axios.get('https://internle-blogbackend.onrender.com/api/posts'); // Replace '/api/posts' with the actual endpoint URL
      setPosts(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://internle-blogbackend.onrender.com/api/posts'); // Replace '/api/posts' with the actual endpoint URL
        setPosts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(()=>{
    if (!posts){
      return;
    }
    var tempposts = posts;
  },[posts])
  // var tempposts = [];
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
        // if (!isadmin1){
        //   navigate("/404");
        //   // console.log("navigate not working");
        // }
      },[isadmin1])
    const onsubmit = ()=>{

    }
    
  if (!posts) {
    return (
      <div style={{ width: '100vw', backgroundColor: 'rgba(7,17,60,255)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader">
          <div className="loader-circle"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    );
  }

  const handleblogdelete = (postId) => {
    var postId = blodid;
    const deleteEndpoint = `https://internle-blogbackend.onrender.com/api/posts/${postId}`;
    setblogid(null);
    axios
      .delete(deleteEndpoint)
      .then(response => {
        console.log(response.data); // "post deleted"
        // Handle any further actions after successful response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error cases
      });
      fetchData();
  };
  const handleblogedit = (postId,editabletitle,editabledescription) => {
    var postId = blodid;
    const updateEndpoint = `https://internle-blogbackend.onrender.com/api/posts/${postId}`;
    setblogid(null);
    
    const postData = {
      title: String(document.getElementById("editabletitle").innerText),
      description: String(document.getElementById("editabledescription").innerText),
      img: String(document.getElementById("editableimg").src),
    };
    // console.log(postData);
    // seteditabletitle("");
    // seteditabledescription("");
    axios
      .put(updateEndpoint, postData)
      .then(response => {
        console.log(response.data); // "updated"
        // Handle any further actions after successful response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error cases
      });
  };
  return (
    <div>
        <div style={{width:'100vw',height:'300px',backgroundColor:'222831',borderTopRightRadius:'30px',borderTopLeftRadius:'30px',display:'flex',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}}>
            <img src='./Titleopoclogo2.png' style={{width:'400px',marginLeft:'50px'}}></img>
            <h1 style={{color:'white',fontSize:'3em',marginRight:'50px',fontFamily:'monospace',paddingLeft:'20px'}}>Welcome To the Blog Space of OPOC</h1>
        </div>
        <br></br>
        <br></br>
        <center><h1 style={{color:'white'}}>Our Blogs</h1></center>
        <br></br>
        <br></br>
        <center>
        <div className="boxblog" style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}}>
        <select id='selopt' style={{borderRadius:'10px'}}>
          <option value="Theme" onClick={(e)=>{settheme(String(e.target.value));}} style={{borderRadius:'10px'}}>Theme</option>
          <option value="Development" onClick={(e)=>{settheme(String(e.target.value));}} style={{borderRadius:'10px'}}>Development</option>
          <option value="Cloud" onClick={(e)=>{settheme(String(e.target.value));}} style={{borderRadius:'10px'}}>Cloud</option>
          <option value="Hacking" onClick={(e)=>{settheme(String(e.target.value));}} style={{borderRadius:'10px'}}>Hacking</option>
          <option value="Artificial Intelligence" onClick={(e)=>{settheme(String(e.target.value));}} style={{borderRadius:'10px'}}>Artificial Intelligence</option>
        </select>
        <input placeholder='Search' onChange={(e)=>{setwords(e.target.value);}} type='text'></input>
      </div>
        </center>
        <br></br>
        <br></br>
        <center>
        
        <br></br>
        <div style={{width:"98vw",display:'flex',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap',borderRadius:'30px',marginBottom:'50px',cursor:'pointer'}}>
          {posts.map((item,index)=>{
            if (words!="" && theme!="Theme"){
              // console.log(document.getElementById("selopt").value);
              if (String(item.category)==String(theme)){
              if (String(item.title).toLowerCase().includes(String(words).toLowerCase()) || String(item.description).toLowerCase().includes(String(words).toLowerCase()) || String(item.category).toLowerCase().includes(String(words).toLowerCase())){
            return(
              <div key={index} style={{width:'300px',height:'650px',margin:'20px',borderRadius:'20px',backgroundColor:"white"}}> 
              <br></br>
              <h5>{item.title}</h5>
              <br></br>
              <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                  <img src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
              </div>
              <br></br>
              <h5>Description:</h5>
              <br></br>
              <p style={{width:'90%',height:'170px',textAlign:'justify',overflowY:'hidden'}}>{item.description}</p>
              <br></br>
              <p>{item.date}</p>
              <br></br>
              <div onClick={()=>{setblogid(item.idposts);}}><a style={{textDecoration:'none',color:'white'}} href='#demo-modal1'><div><p style={{padding:'10px',borderRadius:'10px',backgroundColor:'#00ADB5',width:'50%'}}>Explore</p></div></a></div>
              
          </div>
            );
              }
            }
            }else if (words!=""){
              if (String(item.title).toLowerCase().includes(String(words).toLowerCase()) || String(item.description).toLowerCase().includes(String(words).toLowerCase()) || String(item.category).toLowerCase().includes(String(words).toLowerCase())){
                return(
                  <div key={index} style={{width:'300px',height:'650px',margin:'20px',borderRadius:'20px',backgroundColor:"white"}}> 
                  <br></br>
                  <h5>{item.title}</h5>
                  <br></br>
                  <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                      <img src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
                  </div>
                  <br></br>
                  <h5>Description:</h5>
                  <br></br>
                  <p style={{width:'90%',height:'170px',textAlign:'justify',overflowY:'hidden'}}>{item.description}</p>
                  <br></br>
                  <p>{item.date}</p>
                  <br></br>
                  <div onClick={()=>{setblogid(item.idposts);}}><a style={{textDecoration:'none',color:'white'}} href='#demo-modal1'><div><p style={{padding:'10px',borderRadius:'10px',backgroundColor:'#00ADB5',width:'50%'}}>Explore</p></div></a></div>
                  
              </div>
                );
                  }
            }else if (theme!="Theme"){
              if (String(item.category)==String(theme)){
                return(
                  <div key={index} style={{width:'300px',height:'650px',margin:'20px',borderRadius:'20px',backgroundColor:"white"}}> 
                  <br></br>
                  <h5>{item.title}</h5>
                  <br></br>
                  <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                      <img src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
                  </div>
                  <br></br>
                  <h5>Description:</h5>
                  <br></br>
                  <p style={{width:'90%',height:'170px',textAlign:'justify',overflowY:'hidden'}}>{item.description}</p>
                  <br></br>
                  <p>{item.date}</p>
                  <br></br>
                  <div onClick={()=>{setblogid(item.idposts);}}><a style={{textDecoration:'none',color:'white'}} href='#demo-modal1'><div><p style={{padding:'10px',borderRadius:'10px',backgroundColor:'#00ADB5',width:'50%'}}>Explore</p></div></a></div>
                  
              </div>
                );

              }
            }else{
              return(
                <div key={index} style={{width:'300px',height:'650px',margin:'20px',borderRadius:'20px',backgroundColor:"white"}}> 
                <br></br>
                <h5>{item.title}</h5>
                <br></br>
                <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                    <img src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
                </div>
                <br></br>
                <h5>Description:</h5>
                <br></br>
                <p style={{width:'90%',height:'170px',textAlign:'justify',overflowY:'hidden'}}>{item.description}</p>
                <br></br>
                <p>{item.date}</p>
                <br></br>
                <div onClick={()=>{setblogid(item.idposts);}}><a style={{textDecoration:'none',color:'white'}} href='#demo-modal1'><div><p style={{padding:'10px',borderRadius:'10px',backgroundColor:'#00ADB5',width:'50%'}}>Explore</p></div></a></div>
                
            </div>
              );
            }
          })}
            
            
            
            
            
        </div>
        </center>
      <div id="demo-modal1" className="modal1" >
    <div className="modal1__content" style={{borderRadius:'20px',backgroundColor:'#232323'}}>
      {[0].map((item1,index1)=>{
          if (isadmin1){
            return(
              <div>
      {posts.map((item,index)=>{
        if (blodid=="" || blodid==null){
          if (index==0){
          return(<div style={{width:'100%',height:'350px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <center><h1 style={{color:'white'}}>Welcome to the blogs Section</h1></center>
          </div>);
          }
        }
        else if (item.idposts==blodid){
          return(
            <div key={index}>
              <center>
    <br></br>
                <h5 id='editabletitle' style={{color:"white"}}  contentEditable="true">{item.title}</h5>
                <br></br>
                <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                    <img id='editableimg' src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
                </div>
                <br></br>
                <h5 style={{color:"white"}}>Description:</h5>
                <br></br>
                <p id='editabledescription' style={{width:'90%',textAlign:'justify',color:'white'}} contentEditable="true">{item.description} </p>
                <br></br>
                <p style={{color:'white'}}>{"Date Posted: "+item.date }</p>
                <br></br>
                <br></br>
                <br></br>
                <iframe width="87%" height="430" style={{marginLeft:'-2px',borderRadius:'9px',borderStyle:'solid',borderColor:'white',borderBottomWidth:'2px',borderTopWidth:'4px'}} src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <br></br>
                <br></br>
                </center>
            </div>
          );
        }
      })}
      </div>
            );
          }else{
            return(<div>
              {posts.map((item,index)=>{
                if (blodid=="" || blodid==null){
                  if (index==0){
                  return(<div style={{width:'100%',height:'350px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <center><h1 style={{color:'white'}}>Welcome to the blogs Section</h1></center>
                  </div>);
                  }
                }
                else if (item.idposts==blodid){
                  return(
                    <div key={index}>
                      <center>
            <br></br>
                        <h5 style={{color:"white"}}>{item.title}</h5>
                        <br></br>
                        <div style={{width:"250px",marginLeft:'0px',height:'250px'}}>
                            <img src={item.img} style={{width:'250px',height:'250px',borderRadius:'20px'}}></img>
                        </div>
                        <br></br>
                        <h5 style={{color:"white"}}>Description:</h5>
                        <br></br>
                        <p style={{width:'90%',textAlign:'justify',color:'white'}}>{item.description} </p>
                        <br></br>
                        <p style={{color:'white'}}>{"Date Posted: "+item.date }</p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <iframe width="87%" height="430" style={{marginLeft:'-2px',borderRadius:'9px',borderStyle:'solid',borderColor:'white',borderBottomWidth:'2px',borderTopWidth:'4px'}} src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <br></br>
                        <br></br>
                        </center>
                    </div>
                  );
                }
              })}
              </div>);
          }
      })}
      
      
        <div className='modal1-button' style={{width:'25%',marginLeft:'70%',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <div >
          {[0].map((item,index)=>{
            if (isadmin1){
              return(<div >
                <div onClick={()=>{handleblogdelete();}}>
                <a href="#" style={{textDecoration:'none'}}>
                    <div class="first-button">
                        <p>
                            Delete
                        </p>
                    </div>
                </a>
                </div>
                <br></br>
                <div onClick={()=>{handleblogedit()}}>
                <a href="#" style={{textDecoration:'none'}}>
                    <div class="first-button">
                        <p>
                           Edit
                        </p>
                    </div>
                </a>
                </div>
                <br></br>
                <div onClick={()=>{setblogid("")}}>
                <a href="#" style={{textDecoration:'none'}}>
                    <div class="first-button">
                        <p>
                            Close
                        </p>
                    </div>
                </a>
                </div>
              </div>);
            }else{
              return(<div>
                <div onClick={()=>{setblogid("");}}>
                <a href="#" style={{textDecoration:'none'}}>
                    <div class="first-button">
                        <p>
                            Close
                        </p>
                    </div>
                </a>
                </div>
              </div>)
            }
          })}
        
        </div>

        </div>



        <div onClick={()=>{setblogid("")}}><a href="" className="modal1__close">&times;</a></div>
    </div>
    </div>
    </div>
  )
}

export default Blog;