import React, { useEffect } from 'react';
import {Container, } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
      activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App'/>
  return (
    <div>
      <Container>
      <NavBar />
        <ActivityDashboard />
      </Container>
    </div>
  );
}

export default observer(App);
