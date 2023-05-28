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
            <Route path="/" element={<Navigate replace to='/PhpReactShoppingList/login' />}/>
            <Route path="/PhpReactShoppingList/:id" element={loggedIn?<Data onLogout={handleLogout}/>:<Navigate replace to='/PhpReactShoppingList/login' />}/> 
            <Route path="/PhpReactShoppingList/login" element={loggedIn ? <Navigate replace to='/PhpReactShoppingList/:id' /> : <Login onLogin={handleLogin} />}/>
            <Route path="/PhpReactShoppingList/registration" element={loggedIn ?<Navigate replace to='/PhpReactShoppingList/:id' />: <Sign onLogin={handleLogin} />}/>
        </Routes>
    )
}

export default Pages;