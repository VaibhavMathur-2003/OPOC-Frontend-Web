import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobsPage.css';
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";

export function JobsPage() {
  const [companyData, setCompanyData] = useState(null);
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

  useEffect(() => {
    axios
      .get('https://skitter-adaptable-shallot.glitch.me/receive-data')
      .then(response => {
        const data = response.data;
        setCompanyData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (!companyData) {
    return <div style={{width:'100vw',backgroundColor:'rgba(7,17,60,255)',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div class="loader">
    <div class="loader-circle"></div>
    <span class="loader-text">Loading...</span>
 </div></div>;
  }

  const { company_name_list: companiesArray } = companyData;
  const dictionary = {};

  for (let charCode = 97; charCode <= 122; charCode++) {
    const key = String.fromCharCode(charCode);
    dictionary[key] = [];
  }

  for (let i = 0; i < companiesArray.length; i++) {
    const company = companiesArray[i];
    const firstLetter = company.charAt(0).toLowerCase();
    dictionary[firstLetter].push(company);
  }

  const overall = Object.keys(dictionary).map(key => {
    if (dictionary[key].length === 0) return null;

    const letters = dictionary[key].map(comp => {
      const url = `/listings?q=${comp}`;

      return (
        <div className="card" key={comp}>
            <div>
          <a className='z' href={url} style={{textDecoration:'none',marginTop:'10px',color:'white'}}>
          <span></span>
      <span></span>
      <span></span>
      <span></span>
            {comp.toUpperCase()}
          </a>
          </div>
        </div>
      );
    });

    return (
      <div className="a" key={key}>
        <br></br>
        <br></br>
        <br></br>
        <div id={key}>
          <h2 className="cmpny-alpha" style={{color:'white'}}>{"Companies: "+key.toUpperCase()}</h2>
          
        </div>
        <section className={`product ${key}`}>
          <div className="product-container">{letters}</div>
        </section>
        <br />
      </div>
    );
  });

  return <div style={{width:'100vw',height:'100vh'}}><div className="banner" style={{width:'100vw',height:'100vh'}}>
  <div className="content" style={{marginTop:'0%',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <h1>THIS IS THE FUTURE</h1>
      <p>If you are seeing this , you did the right job. 
          You are just one click away now!!
          </p>
          <input type="text" style={{width:"300px",height:"38px",borderRadius:'5px',border:'none'}} className="form-control" id="inputPassword2" placeholder="   keywords"></input>
          <button style={{marginTop:'20px',position:'relative',marginTop:'40px'}} type="submit" className="button">Search</button>
          {/* <form className="form-inline"style={{width:'100%',alignSelf:'flex-start'}} >
      <div className="form-group mx-sm-3 mb-2 col-md-2 keywords" >
        <input type="text" style={{width:"300px",height:"38px",borderRadius:'5px',border:'none'}} className="form-control" id="inputPassword2" placeholder="   keywords"></input>
      </div>
      <button style={{marginTop:'-10%'}} type="submit" className="button">Search</button>
  </form> */}
  <br></br>
  <br></br>
  <div style={{display:'flex',width:'100vw',color:'white',fontFamily:'fantasy',fontSize:'40px',justifyContent:'center',alignItems:'center',marginTop:'13%'}}><h2>Companies&nbsp;&darr;</h2></div>
  </div>
  
  
</div><div className="xyz">{overall}</div></div>;
}
