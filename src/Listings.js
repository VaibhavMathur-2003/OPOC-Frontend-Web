import React, { useState, useEffect } from 'react';
import './style2.css';
import axios from 'axios';
import { useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// import backgroundImage from './hello'
import { auth , googleProvider} from "./config/firebase";
import { useNavigate } from "react-router-dom";

function Listings() {
  const [companyData, setCompanyData] = useState(null);
  const [folderOpen, setFolderOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const folderRef = useRef(null);
  const text = `Apple Inc. is a multinational technology company headquartered in Cupertino, California. It designs, develops, and sells consumer electronics, computer software, and online services. The company is widely known for its flagship products such as the iPhone, Mac, iPad, and Apple Watch. Apple has a strong focus on innovation and user experience, and it has revolutionized several industries with its groundbreaking products and services.`;
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('q');
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
        const companiesArray = data["company_name_list"];
        const jobArray = data["company_posting_array"];
        console.log(companiesArray);
        console.log(jobArray);

        const j = companiesArray.indexOf(param);
        const jobListings = jobArray[j].map(job => (
          <div className="feuille" key={job} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', zIndex: 0,height:'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '90%', marginTop: '10px',flexDirection:'column' }}>
            {/* <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}> */}
            <br></br>
                <p>Job Post:</p>
                <br></br>
              <p style={{ Width: '100%', fontSize: '13px', paddingTop: '3px',textAlign:'left' }}>{job.job_title}</p>
              <br></br>
              <p>Location:</p>
              <br></br>
              <p style={{ Width: '100%', fontSize: '13px', paddingTop: '3px',textAlign:'left' }}>{job.job_location}</p>
              {/* </div> */}
              <div>
                <br></br>
              <div style={{ zIndex: 1000 }}>
                <a href={job.job_link} style={{ textDecoration: 'none', color: 'white' }}>
                  <span style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '20px' }}>Apply</span>
                </a>
              </div>
              <br></br>
              <br></br>
              </div>
            </div>
          </div>
        ));

        setCompanyData(jobListings);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [param]);


  if (!companyData) {
    return (
      <div style={{ width: '100vw', backgroundColor: 'rgba(7,17,60,255)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader">
          <div className="loader-circle"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    );
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const folders = document.querySelectorAll('.folder');

  const closeButton = () => {
    const closeButton = document.createElement('button');
    closeButton.classList.add('folder-delete-button');
    return closeButton;
  }
  const heading = () =>{
    const heading = document.createElement('p');
    heading.classList.add('head');
    heading.innerHTML = "Job Listings"
    return heading;

  }

  
  const handClick = ()=>{
    setFolderOpen(!folderOpen);
  }
  
  
  
  return (
    <div className="wrapper" style={{ display: 'block' }}>
      <div className="company" style={{ width: '100vw', height: '100vh', borderRadius: '0', backgroundImage: 'url("https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ paddingTop: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-10%' }}>
          <div className="company-info">
            <h2 style={{ color: 'white', fontFamily: 'fantasy', fontSize: '50px' }}>Job Listings in {capitalizeFirstLetter(param)}</h2>
          </div>
        </div>
      </div>
      <div className="jobs" style={{ display: 'flex', alignItems: 'center', width: '100vw' }}>
        <center>
        <h1 className="main-head" style={{ marginTop: '5%', color: 'white', marginBottom: '-2%', fontFamily: 'fantasy' }}>
          Currently Open Jobs in {capitalizeFirstLetter(param)}
        </h1>
        </center>
        <div className={`folder${folderOpen ? ' open' : ''}`} style={{ marginTop: '20vh' }} onClick={handClick}>
            <button className='folder-delete-button' style={(folderOpen)?{display:'block'}:{display:'none'}} ></button>
          <div className="scroll">
            {companyData}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listings;
