import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    handleFormClose: () => void;
    handleFormOpen: (id: string) => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, handleFormOpen, handleFormClose, handleCreateOrEditActivity, handleDeleteActivity}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
        <ActivityList activites={activities} selectActivity={selectActivity} handleDeleteActivity={handleDeleteActivity}/>
        </Grid.Column>
        <GridColumn width='6'>
          {selectedActivity && !editMode &&
            <ActivityDetails handleFormOpen={handleFormOpen} activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}/>
          } 
          {editMode && <ActivityForm activity={selectedActivity} handleFormClose={handleFormClose} handleCreateOrEditActivity={handleCreateOrEditActivity}></ActivityForm>}
        </GridColumn>
    </Grid>
  )
}
