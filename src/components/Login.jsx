import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

function Login({onLogin}){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [login, setLogin] = useState("hey");

    useEffect(()=>{
        Object.values(login).map((item)=>{
            if(item.num === 1){
                onLogin();
                navigate("/"+item.id);
            }
        })
    },[login])

    const fetchData=async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('user', user) ;
        formData.append('pass', pass);
        const api = await fetch("https://bootstrapphpshoppinglist.000webhostapp.com/login.php",{
            method: 'POST',
            body: formData
        });
        const data = await api.json();
        setLogin(data);
        console.log(data)
    } 

    return(
    <Wrapper>  
        <Form onSubmit={fetchData}>
          <h2>Login</h2>
         {login===0?<p>Invalid username or password</p>:""}
            <label>
                <p>Name:</p>
                <input type="text" value={user} onChange={(e)=> setUser(e.target.value)}  placeholder="Enter your username" required/>
            </label>
            <br/>
            <label>
                <p>Password:</p>
                <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}  placeholder="Enter your password" required/>
            </label>
            <br/>
            <button type="submit">Submit</button>
            <p><Link to="/registration">Click here to sign up</Link></p>
        </Form>
        <Footer/>
        </Wrapper>
    )
}
export default Login;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient( 109.6deg,  rgba(61,131,97,1) 11.2%, rgba(28,103,88,1) 91.1% );
    width: 100%;
    min-height: 100vh;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #e3e3e3;
    width: 40%;
    min-height: 50vh;
    box-shadow: 20px 20px 20px 20px rgb(0 0 0 / 0.3);
    border-radius: 10px;
    label{
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 15px;
        width: 60%;
    }
    label input{
        padding: 10px;
        border: none;
        background: #fff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
    label input:focus{
        outline: none !important;
        border: 2px solid rgba(61,131,97,1);
    }
    button{
        padding: 10px;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 10px;
        background: rgba(28,103,88,1);
        color: #fff;
        cursor: pointer;
    }
    button:hover{
        transition: all 0.3s ease-in-out;
        background: rgba(61,131,97,1);

    }

    @media only screen and (max-width: 912px) {
        width: 90%;
        height: 90vh;
    }
`