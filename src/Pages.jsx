import { Route, Routes, Navigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import Data from "./components/Data";
import Sign from "./components/Sign";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";

function Pages (){

    const [loggedIn, setLoggedIn] = useState(false);

    /*useEffect(()=>{
      active();
    },[])

    const active =() =>{

    }*/
   
    const handleLogin = () => {
        setLoggedIn(true);
      };
    
    const handleLogout = () => {
        setLoggedIn(false);
      };  

    return(
        <Routes>
            <Route path="/" element={<Navigate replace to='/login' />}/>
            <Route path="/:id" element={loggedIn?<Data onLogout={handleLogout}/>:<Navigate replace to='/login' />}/> 
            <Route path="/login" element={loggedIn ? <Navigate replace to='/:id' /> : <Login onLogin={handleLogin} />}/>
            <Route path="/registration" element={loggedIn ?<Navigate replace to='/:id' />: <Sign onLogin={handleLogin} />}/>
        </Routes>
    )
}

export default Pages;