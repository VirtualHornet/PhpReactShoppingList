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
            <Route path="/" element={<Navigate replace to='/List/login' />}/>
            <Route path="/List/:id" element={loggedIn?<Data onLogout={handleLogout}/>:<Navigate replace to='/List/login' />}/> 
            <Route path="/List/login" element={loggedIn ? <Navigate replace to='/List/:id' /> : <Login onLogin={handleLogin} />}/>
            <Route path="/List/registration" element={loggedIn ?<Navigate replace to='/List/:id' />: <Sign onLogin={handleLogin} />}/>
        </Routes>
    )
}

export default Pages;