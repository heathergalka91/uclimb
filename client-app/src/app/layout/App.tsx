import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then((response) => {
      setActivites(response.data);
    })
  }, []);

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(f => f.id === id));
  }
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string){
      id ? handleSelectedActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
  }
  function handleFormClose(){
    handleCancelSelectActivity();
    setEditMode(false);
  }
  function handleDeleteActivity(id: string){
    setActivites(activities.filter(f => f.id !==id));
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
      ? setActivites([...activities.filter(x => x.id !== activity.id), activity])
      : setActivites([...activities, {...activity, id: uuid()}]);

      setEditMode(false);
      setSelectedActivity(activity);

  }

  return (
    <div>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        handleFormClose = {handleFormClose}
        handleFormOpen = {handleFormOpen}
        handleCreateOrEditActivity = {handleCreateOrEditActivity}
        handleDeleteActivity = {handleDeleteActivity}
        />
      </Container>
    </div>
  );
}

export default App;
