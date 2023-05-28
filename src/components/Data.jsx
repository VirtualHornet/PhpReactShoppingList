import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import {AiOutlineClose, AiOutlineCheck} from "react-icons/ai";
import Footer from "./Footer";
function Data({onLogout}) {

    const [data, setData] = useState([]);
    const [active, setActive] = useState(true);
    const [success, setSuccess] = useState(false);
    const [product, setProduct] = useState();
    const [number, setNumber] = useState();
    const [table, setTable] = useState([]);
    const [cleared, setCleard] = useState(false);
    const [check , setCheck] = useState("");
    const param = useParams();
    const navigate = useNavigate();

    const handleCheck = async(id, check)=> {
        const formData = new FormData();
        formData.append('id',id);
        formData.append('checked',check);

        const api = await fetch('https://bootstrapphpshoppinglist.000webhostapp.com/check.php',{
            method: 'POST',
            body: formData
        });
        const data = await api.json();
        setCheck(data);
        console.log(data);
    };

    useEffect(()=>{
        const handleTabClose = event =>{
        event.preventDefault();

        console.log('beforeunload event triggered');
        logOut();
        onLogout();
        return (event.returnValue =
          'Are you sure you want to exit?');
      };
    
      window.addEventListener('beforeunload', handleTabClose);
    
      return () => {
        window.removeEventListener('beforeunload', handleTabClose);
      };
    },[])

    useEffect(()=>{
        api();
        getTable();
        if(active === 1){
            onLogout();
            navigate("/PhpReactShoppingList/login");
        }
    },[active,check,success,cleared]);

    const api = async ()=>{
        const getApi = await fetch('https://bootstrapphpshoppinglist.000webhostapp.com/');
        const getdata = await getApi.json();
        console.log(getdata);
        setData(getdata);
    } 

    const logOut = async ()=>{
        const formData = new FormData();
        formData.append('id',param.id);
        const api = await fetch('https://bootstrapphpshoppinglist.000webhostapp.com/logout.php',{
            method: 'POST',
            body: formData
        });
        const data = await api.json();
        console.log(data);
        setActive(data);
    }

    const getTable = async ()=>{
        const api = await fetch('https://bootstrapphpshoppinglist.000webhostapp.com/list.php');
        const data = await api.json();
        console.log(data)
        setTable(data);
    }

    const addToTable = async (event)=>{
        event.preventDefault();
        setCleard(false);
        const formData = new FormData();
        formData.append('item', product);
        formData.append('num',number);
        const api = await fetch('https://bootstrapphpshoppinglist.000webhostapp.com/addToList.php',{
            method: 'POST',
            body: formData
        });
        const data = await api.json();
        console.log(data);
        setSuccess(data)
    }

    const clearTable = async () =>{
        const api = await fetch("https://bootstrapphpshoppinglist.000webhostapp.com/clearTable.php");
        const data = await api.json();
        console.log(data);
        setCleard(data);
    }

 


    return (
        <Wrapper>
            <Contant>
                <LogOut onClick={logOut}>LOG OUT</LogOut>         
                
            {Object.values(data).map((item) => {
                return(
                    <p key={item.id}>
                        {(item.id === param.id)?<h2>Welcome <strong>{item.name}</strong></h2>:""
                        }
                    </p>
                )
        })}
    <AddToList onSubmit={addToTable}>
        <input type="text" name='product' onChange={(e)=>setProduct(e.target.value)} placeholder="Add product to the list" required/>
        <input type="text" name='number' onChange={(e)=>setNumber(e.target.value)} placeholder="num" required/>
        <button type="submit">ADD</button>
    </AddToList>

    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Number</th>
          <th>Product</th>
          <th className="dis">Date</th>
          <th><button onClick={clearTable}><AiOutlineClose/></button></th>
        </tr>
      </thead>
      <tbody>
        {(Object.keys(table).length>0)?Object.values(table).map(item=>{
            return(
            <tr key={item.id} className={(item.check=== '0')?``:`check`} >
                <td>{item.num}</td>
                <td>{item.product}</td>
                <td className="dis">{item.date}</td>
                <td><button onClick={()=>handleCheck(item.id, item.check)}><AiOutlineCheck/></button></td>
              </tr>
            )
        }):
            <tr>
                <td><strong>Empty list</strong></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        }
      </tbody>
    </table>
        
        
        
            </Contant> 
            <Footer className="dis"/>
        </Wrapper>
    )
}
export default Data;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient( 109.6deg,  rgba(61,131,97,1) 11.2%, rgba(28,103,88,1) 91.1% );
    width: 100%;
    min-height: 100vh;
`

const Contant = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    background: #e3e3e3;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 90%;
    min-height: 90vh;
    box-shadow: 20px 20px 20px 20px rgb(0 0 0 / 0.3);
    border-radius: 10px;
    h2{
        position: absolute;
        font-size: 2rem;
        top: 10%;
        right: 35%;
        left: 35%;
    }
    h2 strong{
        text-transform: uppercase;
        color: rgba(28,103,88,1);
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
        margin-bottom: 10px;
    }
    button:hover{
        transition: all 0.3s ease-in-out;
        background: rgba(61,131,97,1);
    }
    table{
        margin-top: 2%;
        margin-bottom: 10px;
        width: 90%;
        table-layout: fixed;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    th{
        padding: 10px 15px;
        text-align: left;
        font-weight: 500;
        font-size: 12px;
        color: #fff;
        background-color: rgba(28,103,88,1);
        text-transform: uppercase;
        button{
            background: #fff;
            font-size: 1.1rem;
            text-align: center;
            vertical-align: middle;
            margin: auto;
            color: rgba(28,103,88,1);
        }
        button:hover{
            color: #fff;
        }
    }
    td{
        padding: 15px;
        text-align: left;
        text-transform: uppercase;
        vertical-align:middle;
        font-weight: 600;
        font-size: 14px;
        color: #545151;
        background: #fff;
        border-bottom: solid 2px rgba(104, 104, 104, 0.1);
        button{
            background-color: rgba(61,131,97,1)
        }
        button:hover{
            background-color: rgba(28,103,88,1);
        }
    }
    @media only screen and (max-width: 912px) {
        h2{
            right: 10%;
            left: 10%;
        }
    }
    @media only screen and (max-width: 280px) {
        font-size: 10px;
        .dis{
            display: none;
        }
    }

`

const AddToList = styled.form`
    width: 98%;
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    input{
        padding: 10px;
        border: none;
        background: #fff;
        width: 30%;
        height: 40px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    input:focus{
        outline: none !important;
        border: 2px solid rgba(61,131,97,1);
    }
    button{
        height: 60px;
        border-top-left-radius: 1px;
        border-bottom-left-radius: 1px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    @media only screen and (max-width: 912px) {
        margin-top: 17%;
    }
`

const LogOut = styled.button`
    position: absolute;
    top: 10%;
    right: 10%;
    text-align: right;
    @media only screen and (max-width: 912px) {
        top: 7%;

    }
   
`

