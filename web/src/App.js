import './App.css';
import { baseUrl } from "./core"
import axios from 'axios';
import { useEffect} from "react"


import {
  Switch,
  Route,
 useHistory,

} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import Splash from './components/splash/index'; 
import Login from "./components/login/index"
import Signup from "./components/signup/index"
import Dashboard from "./components/dashboard/index"

import { GlobalContext } from './context/Context';
import { useContext } from "react";

function App() {

  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {

    axios.get(`${baseUrl}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              _id: res.data._id
            }
          })
        } else {
          dispatch({ type: "USER_LOGOUT" })
        }
      }).catch((e) => {
        dispatch({ type: "USER_LOGOUT" }
        )
        console.log(e)
      })

    return () => {
    };
  }, []);


  return (
    <>
      
      {(state.user === undefined) ?
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          {/* <Redirect to="/" /> */}
        </Switch>
        : null}

      {(state.user === null) ?
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {/* <Redirect to="/" /> */}
        </Switch> : null
      }

      {(state.user) ?
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Route exact path="/**" component={Dashboard} />

        </Switch>
        : null}
    </>
  );
}

export default App;