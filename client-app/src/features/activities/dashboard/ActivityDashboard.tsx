import { observer } from 'mobx-react-lite';
import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
}

export default observer(function ActivityDashboard({}: Props) {
  const{ activityStore } = useStore();
  const {editMode, selectedActivity} = activityStore;
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList />
        </Grid.Column>
        <GridColumn width='6'>
          {selectedActivity && !editMode &&
            <ActivityDetails/>
          } 
          {editMode && <ActivityForm ></ActivityForm>}
        </GridColumn>
    </Grid>
  )
}
)