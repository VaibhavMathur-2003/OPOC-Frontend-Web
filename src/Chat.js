import React from 'react';
import './chat.css';
import searchIcon from './img/search.jpg';
import imgIcon from './img/img.png';
import sendIcon from './img/send.png'
import i from "./img/i.png";
import people from "./img/people.png"
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('https://boom-sulfuric-judge.glitch.me'); 

function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const [showloader,setshowloader] = useState(null);
  const [username,setusername] = useState(null);
  const [messageIdToDelete, setMessageIdToDelete] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setusername(user.displayName);
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
  useEffect(()=>{
    if (!username){
      return;
    }
    var temp12 = username;
  },[username])
  const handleNewMessage = (message) => {
    // setMessages((prevMessages) => [...prevMessages, { username: username, text: newMessage}]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    socket.emit('chat message',{ username: username, text: newMessage});
    setMessages((prevMessages) => [...prevMessages, { username: username, text: newMessage}]);
    document.getElementById("chat-input").value="";

    setNewMessage('');
    fetchMessages();
  };

  const handleDelete = async (messageId) => {
    try {
      await fetch(`https://boom-sulfuric-judge.glitch.me/api/messages/${messageId}`, { method: 'DELETE' });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
    fetchMessages();
  };

  useEffect(() => {
    // Fetch initial chat messages
    fetchMessages();
    


    // Subscribe to chat events
    socket.on('chat message', handleNewMessage);

    // Clean up on component unmount
    return () => {
      socket.off('chat message', handleNewMessage);
    };
  }, []);

  const fetchMessages = async () => {
    var msgs=[];
    try {
      const response = await fetch(`https://boom-sulfuric-judge.glitch.me/api/messages`, {mode:'cors'}); 
      // console.log(response)
      const data = await response.json();
      
      // setMessages(data);
      for (var i in data){
        msgs.push(data[i]);
      }
      // console.log(messages);
      setMessages(msgs);
      // console.log(msgs);
      // console.log(messages);
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    return msgs;
  };
  useEffect(() => {
    if (messages.length==0){
      return;
    }
    var temp123 = messages;
    setshowloader(1);
    // console.log(showloader);
  }, [messages]);
  useEffect(()=>{

      var temp1234 = messageIdToDelete;
  },[messageIdToDelete])

  if (!showloader) {
    return <div style={{width:'100vw',backgroundColor:'rgba(7,17,60,255)',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div class="loader">
    <div class="loader-circle"></div>
    <span class="loader-text">Loading...</span>
 </div></div>;
  }
  

  
  if (messages==[]) {
    return <div style={{width:'100vw',backgroundColor:'rgba(7,17,60,255)',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div class="loader">
    <div class="loader-circle"></div>
    <span class="loader-text">Loading...</span>
 </div></div>;
  }
  const removeImage = () => {
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('preview-image').src = '';
    document.getElementById('preview-image').style.display = 'none';
    document.getElementById('preview-container').style.display = 'none';
  };

  const openFilePicker = () => {
    document.getElementById('file-input').click();
  };

  const send = () => {
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('preview-image').src = '';
    document.getElementById('preview-image').style.display = 'none';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('chat-input').value = '';
  };

  const handleFile = (input) => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById('preview-container').style.display = 'block';
      document.getElementById('preview-image').src = e.target.result;
      document.getElementById('preview-image').style.display = 'block';
      document.getElementById('preview-container').style.display = 'block';
    };

    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        e.target.value += '\n';
      } else {
        e.preventDefault();
        document.getElementById('send-btn').click();
      }
    }
  };
  
  function capitalizeFirstLetter(string) {
    if (!string){
      return;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }
  const colors = ["blue","#eb3455"]
  const avatars = ["https://www.eyedocs.co.uk/components/com_community/assets/user-anon.png","https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png","https://us.123rf.com/450wm/jemastock/jemastock1904/jemastock190443745/121607875-avatar-homme-personnage-portrait-profil-vector-illustration-graphic-design.jpg?ver=6","https://cdn.myportfolio.com/17be4dd08c5417027a544816a909fcf8/979c9db7-f35c-4beb-9df9-6c8b3c04d1b3_rw_600.gif?h=58f48393c5b7fbd65d39f6ab7e9b095b","https://img.freepik.com/premium-vector/men-icon-avatar-character-cheerful-happy-people-flat-vector-illustration-round-frame-male-portraits-group-team-adorable-guys-isolated-white-background_275421-251.jpg"];

  return (
    <div className="wrapperchat">
      <div className="channel-wrapper" style={{width:'100vw'}}>
        <br></br>
        <br></br>
        
        <center><h1 style={{ marginLeft: '20px', fontSize: '39px', color: 'white' }}>Discussions</h1></center>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <center> */}
        <div className="channels-container" style={{width:'90vw',marginLeft:'5vw'}}>
          <div className="search-container">
            <h2 style={{ marginLeft: '10px', fontSize: '34px', paddingBottom: '25px',paddingTop:'10px', marginTop: '10px',color:'white' }}>Channels</h2>
            <br></br>
            <div className="search" >
              <img className="icon-search" src={searchIcon} style={{ width: '40px', borderRadius: '50%' }} alt="Search" />
            </div>
          </div>
          <center><input type="text" id="search-id" placeholder="Search" style={{ width: '66%', height: '30px', border: 'none', borderRadius: '7px', marginBottom: '15px' }} /></center>
          <br></br>
          <br></br>
          <div className="main-channels" id="main" style={{paddingBottom:'20px',flexDirection:'row',display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'space-evenly',marginLeft:'0',width:'94%'}}>
            
            <div className="channel" style={{width:'250px'}}>
              <div className="row1">
                <div style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
                  <img src="https://wallpapers.com/images/featured/beautiful-scenery-wnxju2647uqrcccv.jpg" style={{ width: '40px', height: '40px', borderRadius: '10px' }} alt="Channel" />
                </div>
                <div>
                  <h2>Channel - I</h2>
                </div>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer' }}>
                  <img src={i} style={{ width: '20px', height: '20px', borderRadius: '50%' }} alt="Info" />
                </div>
              </div>
              <br></br>
              <div className="row2">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginLeft: '15px' }}>
                  <img src={people} style={{ width: '40px', height: '40px', borderRadius: '50%', borderColor: 'black', borderStyle: 'solid' }} alt="People" />
                  <h3 style={{ marginLeft: '10px' }}>39</h3>
                </div>
                <div style={{ marginRight: '15px' }}>
                  <h2 style={{ backgroundColor: 'rgb(47, 52, 52)', borderRadius: '10px', fontSize: '20px', padding: '5px', color: 'white', cursor: 'pointer' }}>Chat</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </center> */}
      </div>
      <center>
      <div className="chat-wrapper">
        <div className="false-nav">
          <center><h2 style={{ fontSize: '30px', paddingTop: '0px', marginTop: '10px', color: 'white' }}>Channel - I</h2></center>
        </div>
        <br></br>
        <br></br>
        <center>
          <div className="input-bar" style={{width:'85vw',marginBottom:'20px',marginTop:'50px'}}>
            <div className="ipt">
              <textarea onChange={()=>{setNewMessage(document.getElementById("chat-input").value)}} id="chat-input" style={{height:'40px'}} placeholder="Express Your Thoughts" spellCheck="false" onKeyDown={handleKeyDown}></textarea>
              <div id="preview-container" style={{ display: 'none' }}>
                <h2 style={{ width: '100%', marginLeft: '0%', backgroundColor: 'red', color: 'white', borderRadius: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={removeImage}>Remove</h2>
                <img id="preview-image" src="#" style={{ display: 'none' }} alt="Preview" />
              </div>
            </div>
            <div className="image">
              <center><img src={imgIcon} onClick={openFilePicker} alt="Image" /></center>
              <input id="file-input" type="file" style={{ display: 'none' }} onChange={(e) => handleFile(e.target)} />
            </div>
            <div className="send">
              <center><img id="send-btn" src={sendIcon} onClick={ handleSubmit} alt="Send" /></center>
            </div>
          </div>
          </center>
          <br />
          
          
          
          <br />
        <div className="container">
          
          <br />
          <br />
          <br />
          {messages.map((item,index)=>{
            if (item.username!=username){
            return(
              <div className="message-receiver" key={index}>
              <div className="profile-image"><img src={avatars[3]} style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="Profile" /></div>
              <div className="messages-wrap">
                <div className="message-receiver-content" style={{cursor:'pointer'}} id={item._id}>

                  {/* <br></br> */}
                  <p style={{fontSize:'12px',fontWeight:'30px',textAlign:'justify',width:'100%',marginLeft:'-15px',paddingTop:'4px',paddingBottom:'3px',color:colors[1]}}>{capitalizeFirstLetter(item.username)}</p>
                  {/* <br></br> */}
                  {/* <a href='#demo-modal' style={{textDecoration:'none',color:'black'}}> */}
                  {/* <div className="drop">
                    <p className="drop-down"> &#8964;</p>
                  </div> */}
                  <p style={{paddingBottom:'8px'}}>{item.text}</p>
                  {/* </a> */}
                </div>
                
              </div>
            </div>
            );
            }else{
              return(
                <div className="message-sender" key={index}>
                  <div className="messages-wrap-sender">
                    <div className="message-sender-content" style={{cursor:'pointer'}} id={item._id}>
                      <div onClick={()=>{setMessageIdToDelete(item._id);}}>
                      <a href='#demo-modal' style={{textDecoration:'none',color:'black'}} >
                      <p style={{fontSize:'12px',fontWeight:'30px',textAlign:'justify',width:'100%',marginLeft:'-15px',paddingBottom:'3px',paddingTop:'4px',color:colors[0]}}>{capitalizeFirstLetter("Me")}</p>
                      {/* <div className="drop">
                      
                        <p className="drop-down"> &#8964;</p>
                      </div> */}
                      <p style={{paddingBottom:'8px'}}>{item.text}</p>
                      </a>
                      </div>
                    </div>
                  </div>
                  <div className="profile-image"><img src={user.photoURL} style={{ width: '45px', height: '45px', borderRadius: '50%',borderColor:'black' }} alt="Profile" /></div>
                </div>
              );
            }
          })}
          
          
          
          
        </div>
      </div>
      </center>
      
    <div id="demo-modal" className="modal" >
    <div className="modal__content" style={{borderRadius:'20px',backgroundColor:'#232323'}}>
        <h1 style={{color:'white'}}>Delete Message?</h1>
                <br></br>
                {/* <br></br> */}
        <p style={{color:'white'}}>
            Do you Want to delete the message? This is an irreversible action!
        </p>
        <br></br>
        <br></br>
        <div className='modal-button' style={{width:'50%',marginLeft:'40%',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        {/* <a href="#"> */}
            <div class="first-button" onClick={()=>{handleDelete(messageIdToDelete);setMessageIdToDelete(null)}}>
              <a href='#' style={{textDecoration:'none',color:'#0563af'}}>
                <p>
                    Confirm
                </p>
                </a>
            </div>
        {/* </a> */}
        <div onClick={()=>{setMessageIdToDelete(null)}}>
        <a href="#" style={{textDecoration:'none',color:'#0563af'}}>
            <div class="first-button">
                <p>
                    Cancel
                </p>
            </div>
        </a>
        </div>

        </div>



        <a href="" className="modal__close">&times;</a>
    </div>
    </div>
    </div>
  );
}

export default Chat;



//for future purpose for image

{/* <div className="message-receiver">
            <div className="profile-image"><img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="Profile" /></div>
            <div className="messages-wrap">
              <div className="message-receiver-content" style={{cursor:'pointer'}}>
                <a href='#demo-modal' style={{textDecoration:'none',color:'black'}}>
                <p>Yeah, Nice meeting you guys.</p>
                </a>
              </div>
              <div className="message-receiver-content" style={{cursor:'pointer'}}>
                <a href='#demo-modal' style={{textDecoration:'none',color:'black'}}>
                <img src="https://c1.wallpaperflare.com/preview/907/718/481/copper-creek-pleasant-hill-lake.jpg" className="post-image" alt="Post" />
                <p>A pleasant image.</p>
                </a>
              </div>
            </div>
          </div>
          <div className="message-sender">
            <div className="messages-wrap-sender">
              <div className="message-sender-content" style={{cursor:'pointer'}}>
                <a href='#demo-modal' style={{textDecoration:'none',color:'black'}}>
                <img src="https://e0.pxfuel.com/wallpapers/483/464/desktop-wallpaper-imgur-the-most-awesome-on-the-internet-beautiful-places-beautiful-landscapes-autumn-scenery-old-homes-thumbnail.jpg" className="post-image" alt="Post" />
                <p>This is a better view than the previous image as per me.</p>
                </a>
              </div>
            </div>
            <div className="profile-image"><img src="https://wallpapers.com/images/hd/cool-profile-picture-gdhlf31a1n7pcctk.jpg" style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="Profile" /></div>
          </div> */}