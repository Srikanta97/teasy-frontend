import React,{useState, useEffect} from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Main from './pages/Main';
import Expense from './pages/Expense';
import Dashboard from './pages/Dashboard';
import GlobalStyle from './components/GlobalStyle';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import Axios from "axios";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid", null,
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/",
          {
            headers: {
              "x-auth-token": token
            }
          });
        setUserData({
          token,
          user: userRes.data
        });
      }
    };
    checkLoggedIn();
  }, []);
  
    return (
      <>
        <BrowserRouter>
          <GlobalStyle />
          <UserContext.Provider value = {{userData, setUserData}}>
            <Nav />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Home} exact />
              <Route path="/main" component={Main} exact />
              <Route path="/expense" component={Expense} exact />
              <Route path="/dashboard" component={Dashboard} exact />
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </>
    );
}

export default App;
