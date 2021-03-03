import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, HashRouter, Switch } from 'react-router-dom'
import { Login } from './components/Login';
import TodoApp from './components/TodoApp';
import Swal from 'sweetalert2';
import { Card } from './components/Card';
import CardList from './components/CardList';
import { EditProfile } from './components/EditProfile';
import axios from "axios";

const App = () => {

  const [us, setus] = useState(null);

  useEffect(() => {
    axios.get("https://ieti-d8d81-default-rtdb.firebaseio.com/user.json")
                .then(response => {
                  let result = response.data;
                let us = Object.keys(result)
                    .map(key => result[key]);
                setus(us);
                console.log(us)              
                }).catch(error => {
                    alert("An error occurred while trying to connect to the database.");
                });
  }, [])

  //Save data
  localStorage.setItem('user', "daniela@gmail.com");
  localStorage.setItem('pass', "hola123");

  //localStorage.setItem("isLoggedIn", "false");

  let isLogged = localStorage.getItem("isLoggedIn");

  isLogged = (isLogged === "true" ? true : false)

  const [isLoggedIn, setisLoggedIn] = useState(isLogged);

  const handleSuccessfullyLogin = (e) => {
    Swal.fire({
      title: 'Yei!',
      text: 'Welcome',
      timer: 2000,
      timerProgressBar: false,
      icon: 'success',
      showConfirmButton: false
    })
    setisLoggedIn(true);
    localStorage.setItem("isLoggedIn", 'true');
  }

  const handleFailedLogin = (e) => {
    Swal.fire({
      title: 'Error!',
      text: 'Data incorrect',
      icon: 'error',
      showConfirmButton: true
    })
    setisLoggedIn(false);
    localStorage.setItem("isLoggedIn", 'false');
  }

  const LoginView = () => (
    <Login correct={handleSuccessfullyLogin} incorrect={handleFailedLogin} />
  );

  const TodoAppView = () => (

    <TodoApp />
  );

  const EditProfileView = () => (

    <EditProfile update={us} />
  );

  const isLive = isLoggedIn ? TodoAppView : LoginView

  return (

    <div className="App">
      <HashRouter basename="/">
        <div>
          <Switch>
            <Route exact path="/" component={isLive} ></Route>
            <Route path="/newTask" component={Card} ></Route>
            <Route path="/myTasks" component={CardList} ></Route>
            <Route path="/editProfile" component={EditProfileView} ></Route>
          </Switch>
        </div>
      </HashRouter>
    </div>

  );
}

export default App;
