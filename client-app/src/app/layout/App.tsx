import React, {useEffect, useState } from 'react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] =useState(false);

  useEffect(() => {
  activityStore.loadActivities();
  },[activityStore])// comma and brackets makes sure that it won't go in a endless loop you need to define a array of depandency wich we will add later in the course

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id){
      agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(x => x.id !==activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }) 
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() =>{
      setActivities([...activities.filter(x => x.id!==id)])
      setSubmitting(false);
    })
    
  }

  if (activityStore.loadingInitial) return <LoadingComponent content ='Loading app'/>

  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
        activities ={activityStore.activities}
        createOrEdit= {handleCreateOrEditActivity}
        deleteActivity= {handleDeleteActivity}
        submitting = {submitting}
        />
          </Container>
    </>
  );
}

export default observer (App);
