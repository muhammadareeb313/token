import axios from 'axios';
import { useState, useEffect} from "react"
import { baseUrl } from "./../../core"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";
// import * as ReactBoootsrap from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';
import "./dashboard.css"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// const bull = (
//     <Box
//       component="span"
//     //   sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
//   );


function Home() {
    let history = useHistory();

    let { dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState([])
    const [change, setChange] = useState(true)
    const colorChange = change ? "none" : "display"
    // const[loading , setLoading]=useState(false)

    useEffect(() => {

        axios.get(`${baseUrl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)
                // setLoading(true)

            })
    }, [])


    return (
       
        <>
<Box>
      <AppBar  position="static" > 
        <Toolbar >
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
      {`Welcome ${profile.name}`}
    </Typography>

          {/* <Button style={{textAlign:"center"}} variant="h1" color="inherit"onClick={() => { history.push("/") }}>Dashboard</Button> */}
          <Button  variant="h6"color="inherit" onClick={() => {
                   axios.post(`${baseUrl}/api/v1/logout`,{}, {
                       withCredentials: true
                   })
                       .then((res) => {
                           console.log("res +++: ", res.data);
   
                           dispatch({
                               type: "USER_LOGOUT"
                           })
                       })
               }} >Logout</Button>

          <Button variant="h6"color="inherit" onClick={() => {
                   axios.get(`${baseUrl}/api/v1/profile`, {
                       withCredentials: true
                   })
                       .then((res) => {
                           console.log("res +++: ", res.data);
                           setProfile(res.data)
                        setChange(false)
                       })
               }} >get profile</Button>
        </Toolbar>
      </AppBar>
    </Box>



    <Card className={colorChange} sx={{ maxWidth: 350 } } style={{margin:"10px auto"}}>
        <CardContent>
        <Typography color="primary" gutterBottom>Name:</Typography>  
          <Typography variant="h5" color="primary" gutterBottom> {profile.name}</Typography>
        <Typography color="primary" gutterBottom>Email:</Typography>  

          <Typography variant="h6" color="primary" gutterBottom>{profile.email}</Typography>
        <Typography color="primary" gutterBottom>id:</Typography>  

          <Typography sx={{ mb: 2 }} color="primary">{profile._id}
          </Typography>
         </CardContent>
    
      </Card>


        {/* {loading ? ( */}
            {/* <> */}
                 
              
   
              
        {/* </> */}

        {/* // ):( */}
            {/* // <ReactBoootsrap.Spinner animation="border" /> */}

        {/* )} */}
        </>
         
    );
}

export default Home;