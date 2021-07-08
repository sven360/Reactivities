import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
    console.log(response);  
    setActivities(response.data);
    })
  },[])// comma and brackets makes sure that it won't go in a endless loop you need to define a array of depandency wich we will add later in the course

  return (
    <div className="App">
      <Header as='h2' icon='users'content='reactivities'/>
  
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          {activities.map((activity: any) =>(
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
          </List>
    </div>
  );
}

export default App;
