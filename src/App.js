import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";
import Locofy from "./pages/Locofy";
import { useEffect } from "react";
import LoginPage from "./Listings";
import { JobsPage } from "./JobsPage";
import Listings from "./Listings";
import "./global.css"
import Error404 from "./Error404";
import Chat from "./Chat";
import Blog from "./Blog";
import Home from "./Home";
import Admin from "./admin";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "OPOC Login Page";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Locofy />} />
      <Route path="/home" element={<Home />} />
      <Route path='/companies' element={<JobsPage/>}></Route>
      <Route path="/listings" element={<Listings></Listings>}></Route>
      <Route path='/chat' element={<Chat></Chat>}></Route>
      <Route path='/blog' element={<Blog></Blog>}></Route>
      <Route path='/admin' element={<Admin></Admin>}></Route>
      <Route path='/404' element={<Error404></Error404>}></Route>
      <Route path='*'element={<Navigate to="/404"></Navigate>}></Route>
    </Routes>      
  );
}
export default App;
